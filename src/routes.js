// USER HANDLER
const {
    register,
    login,
    forgotPassword,
    editUsers,
    deleteUsers,
    deleteAllUserData,
    getAllUsers,
    getUsers,
  } = require("./handler/user");

// DATABASE HANDLER
const { 
  getAll, 
  deleteAll } = require("./handler/allData");

// Handler Article
const {
  getAllArticles,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("./handler/artikeldata");


// Handler Makanan
const { 
  getAllMakanan, 
  getMakanan, 
  getMakananById, 
  addMakanan,
  updateMakanan, 
  deleteAllMakanan} = require("./handler/makanan");


// Handler Predict
const { predict } = require("./handler/predict");
const { 
  predictAndSaveHistory,
  getHistoryHandler, 
  deleteHistoryHandler } = require("./handler/predichisto");


const routes = [

    // ---------------------
    //  Handler User
    // ---------------------
    //LOGIN
    {
        method: "POST",
        path: "/login",
        handler: login,
    },

    // REGISTER
    {
        method: "POST",
        path: "/register",
        handler: register,
      },

      // Get All User
      {
        method: "GET",
        path: "/users",
        handler: getAllUsers,
      },
      
      // Get Data User by Id
      {
        method: "GET",
        path: "/users/{id}",
        handler: getUsers,
      },

      //RESET PASSWORD
      {
        method: "POST",
        path: "/forgotPassword",
        handler: forgotPassword,
      },

      //EDIT USER PROFILE
      {
        method: "PUT",
        path: "/users/{id}",
        handler: editUsers,
        options: {
          payload: {
            maxBytes: 10485760,
            multipart: true,
            output: "stream",
          },
        },
      },
    
      // users - Hapus Data Users Tertentu
      {
        method: "DELETE",
        path: "/users/{id}",
        handler: deleteUsers,
      },
    
      // users - Hapus Semua Data Users
      {
        method: "DELETE",
        path: "/users",
        handler: deleteAllUserData,
      },


      // ----------------------
      // Handler allData
      // ----------------------

      // GET /database
      // all - Ambil Seluruh Data Database
      {
        method: "GET",
        path: "/database",
        handler: getAll,
      },

      //  DELETE /database
      // all - Hapus Seluruh Data Database
      {
        method: "DELETE",
        path: "/database",
        handler: deleteAll,
      },

    // ---------------------
    //  Handler Article
    // ---------------------

    // getAllArticles - Mengambil Semua Data Artikel dari Firestore
    {
      method: "GET",
      path: "/articles",
      handler: getAllArticles,
    },

    // getArticle - Ambil Data Artikel Tertentu
    {
      method: "GET",
      path: "/articles/{id}",
      handler: getArticle,
    },

    // addArticle - Menyimpan Data Artikel ke Firestore
    {
      method: "POST",
      path: "/articles",
      handler: addArticle,
      options: {
        payload: {
          maxBytes: 10485760,
          multipart: true,
          output: "stream",
        },
      },
    },

    // updateArticle - Memperbarui Data Artikel di Firestore
    {
      method: "PUT",
      path: "/articles/{id}",
      handler: updateArticle,
      options: {
        payload: {
          maxBytes: 10485760,
          multipart: true,
          output: "stream",
        },
      },
    },

    // deleteArticle - Menghapus Data Artikel dari Firestore
    {
      method: "DELETE",
      path: "/articles/{id}",
      handler: deleteArticle,
    },

    // ---------------------
    //  Handler makanan
    // ---------------------

    // getAllArticles - Mengambil Semua Data Artikel dari Firestore
    {
      method: "GET",
      path: "/makanan",
      handler: getAllMakanan,

    },

    // getAllArticles - Mengambil Semua Data Artikel dari Firestore
    {
      method: "GET",
      path: "/makanan/{kategori}",
      handler: getMakanan,

    },


    // getArticle - Ambil Data makanan Tertentu
    {
      method: "GET",
      path: "/makanan/{kategori}/{makananId}",
      handler: getMakananById,

    },

    // addArticle - Menyimpan Data makanan ke Firestore
    {
      method: "POST",
      path: "/makanan",
      handler: addMakanan,
      options: {
        payload: {
          maxBytes: 10485760,
          multipart: true,
          output: "stream",
        },
      },

    },


    // updateArticle - Memperbarui Data makanan di Firestore
    {
      method: "PUT",
      path: "/makanan/{kategori}/{makananId}",
      handler: updateMakanan,
      options: {
        payload: {
          maxBytes: 10485760,
          multipart: true,
          output: "stream",
        },
      },

    },

    // deleteArticle - Menghapus Data Artikel dari Firestore
    {
      method: "DELETE",
      path: "/makanan/{kategori}",
      handler: deleteAllMakanan,
    },


    
    // ---------------------
    // Handler Predict
    // ---------------------

    // POST /predict
    // Membuat Prediksi
    {
      method: "POST",
      path: "/predict",
      handler: predict, 
      options: {
          payload: {
              maxBytes: 10485760, // Batas ukuran file: 10 MB
              multipart: true, // Mendukung multipart/form-data
              output: "stream", // Mendukung streaming file
              parse: true, // Parsing otomatis untuk multipart payload
          },
      },
  },
  {
    method: "POST",
    path: "/predicthisto",
    handler: predictAndSaveHistory, 
    options: {
        payload: {
            maxBytes: 10485760, // Batas ukuran file: 10 MB
            multipart: true, // Mendukung multipart/form-data
            output: "stream", // Mendukung streaming file
            parse: true, // Parsing otomatis untuk multipart payload
        },
    },
  },
  {
    method: 'GET',
    path: '/history/{user_id}', // Menggunakan parameter user_id dalam URL
    handler: getHistoryHandler,
  },
  {
    method: 'DELETE',
    path: '/history/{history_id}', // Menggunakan parameter user_id dalam URL
    handler: deleteHistoryHandler,
  },

      

];


module.exports = routes;