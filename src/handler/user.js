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

    //  Catch
    // ---------
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



// Export Routes

module.exports = { 
    register, 
    login
};
