const mysql = require('mysql2');

/*const ccn = mysql.createConnection({
    host: 'bfmihnzdrggg76jcdc3z-mysql.services.clever-cloud.com',
    port: '3306',
    user: 'ur83fxsyk4fqawtn',
    database:'bfmihnzdrggg76jcdc3z',
    password : 'YYaQhsg5IcdpHWq7Smo2'
});*/
 
const ccn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database:'constancias',
    password : 'juanito'
});

ccn.connect (err=>{
    if (err){
        console.log("no connection error: " + err);
    }else{
        console.log("Bd Connect");
    }
});

module.exports = ccn;