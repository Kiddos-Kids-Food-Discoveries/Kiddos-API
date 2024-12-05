// USER HANDLER
const {
    register,
    login,
    resetPassword,
    editUsers,
    deleteUsers,
    deleteAllUserData,
    getAllUsers,
    getUsers,
  } = require("./handler/user");

// DATABASE HANDLER
const { getAll, deleteAll } = require("./handler/allData");

// Handler Article
const {
  getAllArticles,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle,
} = require("./handler/artikeldata");

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
        path: "/resetPassword",
        handler: resetPassword,
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
      


];


module.exports = routes;