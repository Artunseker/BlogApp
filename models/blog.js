const { DataTypes }=require('sequelize');
const sequelize=require('../data/db.js');

const Blog=sequelize.define('blog',{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    altbaslik:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    anasayfa:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    onay:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},{
    timestamps:false
});



module.exports=Blog;