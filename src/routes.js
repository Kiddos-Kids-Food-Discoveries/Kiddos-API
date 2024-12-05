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

const routes = [
    {
        method: "POST",
        path: "/login",
        handler: login,
    },
    {
        method: "POST",
        path: "/register",
        handler: register,
      },
      {
        method: "GET",
        path: "/users",
        handler: getAllUsers,
      }, 
      {
        method: "GET",
        path: "/users/{id}",
        handler: getUsers,
      },
      {
        method: "POST",
        path: "/resetPassword",
        handler: resetPassword,
      },
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
    


];


module.exports = routes;