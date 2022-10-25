const mysql = require('mysql2');

const ccn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password : 'juanito',
    database:'alumno'
});

ccn.connect (err=>{
    if (err){
        console.log("no connection error: " + err);
    }else{
        console.log("Bd Connect");
    }
});

module.exports = ccn;