const { DataTypes }=require('sequelize');
const sequelize=require('../data/db.js');

const Categories=sequelize.define('category',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    },{
        timestamps:false
});

module.exports=Categories;