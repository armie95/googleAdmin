const admin = require("firebase-admin");

const serviceAccount = require("./data-card-4321d-firebase-adminsdk-hwref-d8bdaf5f31.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://data-card-4321d-default-rtdb.firebaseio.com"
  });

module.exports = admin;