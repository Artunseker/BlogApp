const { DataTypes }=require('sequelize');
const sequelize=require('../data/db.js');


const Categories=sequelize.define('category',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },url:{
        type:DataTypes.STRING,
        allowNull:false
    }
    });

module.exports=Categories;