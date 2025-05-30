const { DataTypes }=require('sequelize');
const sequelize=require('../data/db.js');


const User=sequelize.define('user',{
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    },email:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    },{timestamps:true});

module.exports=User;