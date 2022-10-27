const mysql = require('mysql2');

const ccn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database:'constancias',
    password : '1205'
});

ccn.connect (err=>{
    if (err){
        console.log("no connection error: " + err);
    }else{
        console.log("Bd Connect");
    }
});

module.exports = ccn;