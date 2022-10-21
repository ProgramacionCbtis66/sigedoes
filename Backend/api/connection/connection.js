const mysql = require('mysql2');

const ccn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password : '1205',
    database:'proyecto'
});

ccn.connect (err=>{
    if (err){
        console.log("no connection error: " + err);
    }else{
        console.log("Bd Connect");
    }
});

module.exports = ccn;