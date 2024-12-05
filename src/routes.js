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

const routes = [
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {

            return 'Hello World!';
        },
    },
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
        // 👉 ""
      },
    
      // GET /users/{id}
      // users - Ambil Data Users Tertentu
      {
        method: "GET",
        path: "/users/{id}",
        handler: getUsers,
      },


];


module.exports = routes;