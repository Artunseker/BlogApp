const mysql=require('mysql2');
const config=require('../config.js');
let connection=mysql.createConnection(config.db);

connection.connect((err)=>{
    if(err){
        console.log("Error connecting to database: "+err);
        return;
    }
    console.log("Connected to database");
});

module.exports=connection.promise();

//promise, async-await =>asenkron programlama
