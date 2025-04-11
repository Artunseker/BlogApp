const { DataTypes }=require('sequelize');
const sequelize=require('../data/db.js');
const Categories = require('./category.js');

const Blog=sequelize.define('blog',{
    blogid:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
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
    },
    categoryid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
});

async function sync(){
        await Blog.sync({force:true});
        console.log("Blog table created");
        //test verisi koyabilirsin
        if(Blog.count==0){
            await Blog.create({
                title:"Blog Title",
                description:"Blog Description",
                altbaslik:"Alt Baslik",
                image:"1.jpeg",
                anasayfa:true,
                onay:true,
                categoryid:1
            });
            await Blog.create({
                title:"Blog Title2",
                description:"Blog Description2",
                altbaslik:"Alt Baslik2",
                image:"2.jpeg",
                anasayfa:true,
                onay:true,
                categoryid:2
            });
        } 
}
sync();

module.exports=Blog;