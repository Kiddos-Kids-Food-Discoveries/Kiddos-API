const firebase_admin = require("firebase-admin");
const api_key = require("../private/key.json").api_key;
const { Storage } = require("@google-cloud/storage");
const bucketName = require("../private/key.json").storage_bucket;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

//  POST /register
const register = async (request, h) => {
  try {
    // Ambil Request Payload
    const apiKey = request.headers["x-api-key"];
    const { name, email, password } = request.payload;

    // API KEY Check
    if (apiKey !== api_key) {
      return h
        .response({
          status: "unauthorized",
          message: "Invalid API key",
        })
        .code(401);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create user in Firebase Authentication using the hashed password
    const userRecord = await firebase_admin.auth().createUser({
      email: email,
      password: hashedPassword,
    });

    // Inisialisasi Firestore
    const db = firebase_admin.firestore();
    const outputDb = db.collection("users");
    const newDocumentRef = outputDb.doc();
    const documentId = newDocumentRef.id;

    // Tambahkan user ke Firestore
    await newDocumentRef.set({
      user_id: documentId,
      firebase_uid: userRecord.uid,
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Response
    return {
      error: false,
      user_id: documentId,
      firebase_uid: userRecord.uid,
      message: "Register Success",
    };

    // Catch
    // ---------
  } catch (error) {
    //  Print Error
    console.error("Error creating user:", error);

    // Response
    const response = {
      error: true,
      message: "Register Failed",
    };

    //  Check if the error is due to an existing email
    if (error.code === "auth/email-already-exists") {
      response.message = "Email address is already in use";
    }

    // Response
    return response;
  }
};

//  POST /login
// ---------------
const login = async (request, h) => {
  try {
    //  Ambil Request Payload
    const apiKey = request.headers["x-api-key"];
    const { email, password } = request.payload;

    //  API KEY Check
    if (apiKey !== api_key) {
      return h
        .response({
          status: "unauthorized",
          message: "Invalid API key",
        })
        .code(401);
    }

    // Get user data from Firestore based on email
    const userQuery = await firebase_admin
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    //  User Not Found
    if (userQuery.empty) {
      //  Response
      return {
        error: true,
        message: "User not found",
      };
    }

    // User Data
    const userData = userQuery.docs[0].data();

    // Ensure that required fields exist in userData
    if (!userData || !userData.password || !userData.firebase_uid) {
      //  Response
      return {
        error: true,
        message: "Invalid user data",
      };
    }

    //  Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, userData.password);

    // Password Not Match
    if (!passwordMatch) {
      //  Response
      return {
        error: true,
        message: "Password wrong",
      };
    }

    // Response
    const response = {
      error: false,
      message: "Login Success",
      user_id: userData.user_id,
      firebase_uid: userData.firebase_uid,
      name: userData.name,
      email: userData.email,
    };

    // Response
    return response;

  } catch (error) {
    //  Print Error
    console.error("Error logging in:", error);

    // Response
    return {
      error: true,
      message: "Login Failed",
    };
  }
};

const resetPassword = async (request, h) => {

  try {
    //  Ambil Request Payload
    const apiKey = request.headers["x-api-key"];
    const { email } = request.payload;

    // API KEY Check
    if (apiKey !== api_key) {
      return h
        .response({
          status: "unauthorized",
          message: "Invalid API key",
        })
        .code(401);
    }

    // Check if the user with the provided email exists
    const userRecord = await firebase_admin.auth().getUserByEmail(email);

    // Generate a password reset link
    const resetLink = await firebase_admin
      .auth()
      .generatePasswordResetLink(email);

    // Placeholder response
    const response = h
      .response({
        error: false,
        message: "Password reset link sent to the user's email",
        resetlink: resetLink,
      })
      .code(200);

    //  Response
    return response;

    // Catch
    // ---------
  } catch (error) {
    // Print Error
    console.error("Error in forgotPassword:", error);

    //  Response
    const response = h
      .response({
        error: true,
        message: "Forgot Password Failed",
      })
      .code(500); // Internal Server Error

    // Response
    return response;
  }
};

// users - Ambil Seluruh Data Users
const getAllUsers = async (request, h) => {
  // Mengambil Kunci API dari Request Header
  const key = request.headers["x-api-key"];
  // Jika Kunci API Benar
  if (key === api_key) {
      const db = firebase_admin.firestore();
      const responseData = {};
      responseData["users"] = [];
      const outputDb = await db.collection("users");
      const snapshot = await outputDb.get();

      snapshot.forEach((doc) => {
          const dataObject = {};
          dataObject[doc.id] = doc.data();
          responseData["users"].push(dataObject);
      });

      const response = h.response(responseData);
      response.code(200);
      return response;
  }
  // Jika Kunci API Salah
  else {
      const response = h.response({
          status: "unauthorized",
      });
      response.code(401);
      return response;
  }
};

// users - Ambil Data Users Tertentu
const getUsers = async (request, h) => {
  // Mengambil Kunci API dari Request Header
  const key = request.headers["x-api-key"];
  // Jika Kunci API Benar
  if (key === api_key) {
      // Mengambil ID Users dari Request Params
      const { id } = request.params;
      const responseData = {};

      const db = firebase_admin.firestore();
      responseData[id] = (await db.collection("users").doc(id).get()).data();

      const response = h.response(responseData);
      response.code(200);
      return response;
  }
  // Jika Kunci API Salah
  else {
      const response = h.response({
          status: "unauthorized",
      });
      response.code(401);
      return response;
  }
};

// editUsers - Edit Data Users
const editUsers = async (request, h) => {
  // Mengambil Kunci API dari Request Header
  const key = request.headers["x-api-key"];

  // Jika Kunci API Benar
  if (key === api_key) {
      try {
          const { userId, name, user_picture } = request.payload;

          // Validasi userId dan name
          if (!userId || typeof userId !== 'string') {
              return h.response({
                  status: 'bad request',
                  message: 'Invalid or missing userId in the payload.',
              }).code(400);
          }

          if (!name || typeof name !== 'string') {
              return h.response({
                  status: 'bad request',
                  message: 'Invalid or missing name in the payload.',
              }).code(400);
          }

          const db = firebase_admin.firestore();
          const userRef = db.collection("users").doc(userId);

          // Check if the user exists
          const userSnapshot = await userRef.get();
          if (!userSnapshot.exists) {
              return h.response({
                  status: "not found",
                  message: "User not found",
              }).code(404);
          }

          // Data to update
          const updateData = { name };

          // Jika terdapat `user_picture`, lakukan proses upload
          if (user_picture) {
              const filename = user_picture.hapi.filename;
              const data = user_picture._data;

              const storage = new Storage({
                  keyFilename: path.join(__dirname, "../private/firebase.json"),
              });

              const fileExtension = filename.split('.').pop();
              const destFileName = `users/${userId}.${fileExtension}`;
              const url = `https://storage.googleapis.com/${bucketName}/${destFileName}`;

              // Upload gambar ke Google Cloud Storage
              async function uploadFile() {
                  const options = {
                      destination: destFileName,
                  };
                  await storage.bucket(bucketName).file(destFileName).save(data, options);

                  // Membuat file menjadi publik
                  await storage.bucket(bucketName).file(destFileName).makePublic();
              }

              await uploadFile();

              // Tambahkan URL gambar baru ke data pembaruan
              updateData.user_picture = url;
          }

          // Update Firestore
          await userRef.update(updateData);

          return h.response({
              status: "success",
              message: "User updated successfully",
          }).code(200);
      } catch (error) {
          console.error("Error editing user:", error);

          return h.response({
              status: "error",
              message: "Failed to update user data",
          }).code(500);
      }
  } else {
      // Jika Kunci API Salah
      return h.response({
          status: "unauthorized",
      }).code(401);
  }
};

// users - Hapus Data Users Tertentu
const deleteUsers = async (request, h) => {
  // Mengambil Kunci API dari Request Header
  const key = request.headers["x-api-key"];
  // Jika Kunci API Benar
  if (key === api_key) {
      const { id } = request.params;

      try {
          const db = firebase_admin.firestore();
          const outputDb = db.collection("users");

          // Get the user document to obtain the user_picture URL and firebase_uid
          const userDoc = await outputDb.doc(id).get();

          // Check if the user exists
          if (!userDoc.exists) {
              const response = h.response({
                  status: "not found",
                  message: "User not found",
              });
              response.code(404); // Not Found
              return response;
          }

          // Delete user document from Firestore
          await outputDb.doc(id).delete();

          // Delete user's photo from cloud storage
          const user_picture_url = userDoc.data().user_picture;
          if (user_picture_url) {
              try {
                  const filename = user_picture_url.split('/').pop(); // Extract filename from URL
                  const storage = new Storage({
                      keyFilename: path.join(__dirname, "../private/gcloud.json"),
                  });

                  // Delete the file from cloud storage
                  await storage.bucket(bucketName).file(`users/${filename}`).delete();
              } catch (storageError) {
                  console.error("Error deleting user photo from cloud storage:", storageError);
                  // Log the error and continue, since it's not critical for the overall operation
              }
          }

          // Delete user from Firebase Authentication
          const firebaseUid = userDoc.data().firebase_uid;
          await firebase_admin.auth().deleteUser(firebaseUid);

          const response = h.response({
              status: "success",
          });
          response.code(200);
          return response;
      } catch (error) {
          console.error("Error deleting user:", error);

          const response = h.response({
              status: "bad request",
              message: "Error deleting user",
          });
          response.code(500); // Internal Server Error
          return response;
      }
  }
  // Jika Kunci API Salah
  else {
      const response = h.response({
          status: "unauthorized",
      });
      response.code(401);
      return response;
  }
};

const deleteAllUserData = async () => {
  try {
      const db = firebase_admin.firestore();
      const outputDb = db.collection("users");

      // Get all documents in the "users" collection
      const snapshot = await outputDb.get();

      // Array to store all promises for parallel execution
      const deletePromises = [];

      // Loop through each document and delete user data
      snapshot.forEach(async (doc) => {
          const userId = doc.id;

          // Delete user document from Firestore
          const deleteDocPromise = outputDb.doc(userId).delete();
          deletePromises.push(deleteDocPromise);

          // Delete user's photo from Cloud Storage
          const user_picture_url = doc.data().user_picture;
          if (user_picture_url) {
              const filename = user_picture_url.split('/').pop();
              const storage = new Storage({
                  keyFilename: path.join(__dirname, "../private/gcloud.json"),
              });

              // Delete the file from Cloud Storage
              const deleteStoragePromise = storage.bucket(bucketName).file(`users/${filename}`).delete();
              deletePromises.push(deleteStoragePromise);
          }

          // Delete user from Firebase Authentication
          const firebaseUid = doc.data().firebase_uid;
          const deleteUserPromise = firebase_admin.auth().deleteUser(firebaseUid);
          deletePromises.push(deleteUserPromise);

          console.log(`User data for ${userId} marked for deletion`);
      });

      // Wait for all promises to resolve
      await Promise.all(deletePromises);

      console.log("All user data deleted successfully");
      return "success"; // Return a value or use return Promise.resolve("success");
  } catch (error) {
      console.error("Error deleting all user data:", error);
      throw error; // Throw an error to fulfill Hapi's expectations
  }
};




// Export Routes

module.exports = { 
    register, 
    login,
    resetPassword,
    getAllUsers,
    getUsers,
    editUsers, 
    deleteUsers, 
    deleteAllUserData

};
