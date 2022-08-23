const admin = require('firebase-admin');
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const serviceAccount = process.env.GOOGLE_CREDS;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;