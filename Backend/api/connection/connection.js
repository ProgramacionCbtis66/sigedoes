const mysql = require('mysql2/promise');

const ccn = async () => {
    try {
        return await mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'sigedoes',
            database: 'sigedoes',
            password: 'E1f2_g3h4'
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        throw error;
    }
}

module.exports = ccn;