const mysql = require('mysql2/promise');

const ccn = async () => {
    try {
        return await mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            database: 'sigese',
            password: '123456'
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        throw error;
    }
}

module.exports = ccn;