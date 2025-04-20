const config=require('../config.js');
//let connection=mysql.createConnection(config.db);

const Sequelize=require('sequelize');

const sequelize=new Sequelize(config.db.database,config.db.user,config.db.password,{
    host:config.db.host,
    dialect:'mysql',
    define:{
        timestamps:false
    }
});

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Connected to database");
    }
    catch(err){
        console.log("Error connecting to database: "+err);
    }
}
testConnection();
module.exports=sequelize;
// connection.connect((err)=>{
//     if(err){
//         console.log("Error connecting to database: "+err);
//         return;
//     }
//     console.log("Connected to database");
// });

// module.exports=connection.promise();

// //promise, async-await =>asenkron programlama
