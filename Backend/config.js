const config = require("dotenv");
config.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST || "http://localhost:";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const NOTIFICACION_URL = process.env.NOTIFICACION_URL;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_secret;
const REDIRECT_URL = process.env.redirect_url;
const REFRESH_TOKEN = process.env.refresh_token;

const correoKey = process.env.correo;
const pwdKey = process.env.passwordCorreo;

 

module.exports = { ACCESS_TOKEN, PUBLIC_KEY, NOTIFICACION_URL, PORT,
     HOST, DB_HOST, DB_PORT, DB_USER, DB_DATABASE, DB_PASSWORD,
      CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN, correoKey, pwdKey};