const mysql = require('mysql2/promise');

const ccn = async () => {
    try {
        return await mysql.createConnection({
            host: 'viaduct.proxy.rlwy.net',
            port: '13087',
            user: 'root',
            database: 'railway',
            password: '-F2Ce4eG4aB1Ff454hC2H5chhC3-5GbG'
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        throw error;
    }
}

module.exports = ccn;