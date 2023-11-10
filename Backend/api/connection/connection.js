const mysql = require('mysql2/promise');
const { DB_HOST, DB_PORT, DB_USER, DB_DATABASE, DB_PASSWORD } = require('../../config');

const ccn = async () => {
    try {
        return await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            database: DB_DATABASE,
            password: DB_PASSWORD
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        throw error;
    }
}

module.exports = ccn;