const Hapi = require("@hapi/hapi");
const routes = require("./routes.js");
const firebase_admin = require("firebase-admin");
const serviceAccount = require("./private/firebase.json");

//  Function - Inisialiasi Firebase
const firebase_init = () => {
  // Kredensial Firebase
  firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(serviceAccount),
  });
};

// Function - Server HAPI
const init = async () => {
  //  Server dan Port
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  //  Routes
  server.route(routes);
  await server.start();
  console.log(`Server: ${server.info.uri}`);
};

// Eksekusi Firebase dan Server
firebase_init();
init();
