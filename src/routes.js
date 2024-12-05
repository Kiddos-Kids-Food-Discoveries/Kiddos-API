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

const routes = [
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
      // Endpoint /database
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
    


];


module.exports = routes;