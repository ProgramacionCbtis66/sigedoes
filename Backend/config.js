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

 

module.exports = { ACCESS_TOKEN, PUBLIC_KEY, NOTIFICACION_URL, PORT, HOST, DB_HOST, DB_PORT, DB_USER, DB_DATABASE, DB_PASSWORD };