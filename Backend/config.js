const config = require("dotenv");
config.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST || "http://localhost:";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const NOTIFICACION_URL = process.env.NOTIFICACION_URL;
 

module.exports = { ACCESS_TOKEN, PUBLIC_KEY, NOTIFICACION_URL, PORT, HOST };