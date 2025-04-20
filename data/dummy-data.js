const Category = require('../models/category');
const Blog = require('../models/blog');

async function populate(){
    const count=await Category.count();

    if(count==0){
        await Category.bulkCreate([
            {name:"mobile"},
            {name:"laptop"},
            {name:"tablet"},
        ]);

        await Blog.create({
            title:"Blog Title",
            description:"Blog Description",
            altbaslik:"Alt Baslik",
            image:"1.jpeg",
            anasayfa:true,
            onay:true,
           
        });
        await Blog.create({
            title:"Blog Title2",
            description:"Blog Description2",
            altbaslik:"Alt Baslik2",
            image:"2.jpeg",
            anasayfa:true,
            onay:true,
        });
    } 
    
}

module.exports=populate;