const Category = require('../models/category');
const Blog = require('../models/blog');

async function populate(){
    const count=await Category.count();

    if(count==0){
        const categories=await Category.bulkCreate([
            {name:"mobile"},
            {name:"laptop"},
            {name:"tablet"},
        ]);
        const blogs =await Blog.bulkCreate([
            {
                title:"Blog Title",
                description:"Blog Description",
                altbaslik:"Alt Baslik",
                image:"1.jpeg",
                anasayfa:true,
                onay:true,
               
            },
            {
                title:"Blog Title2",
                description:"Blog Description2",
                altbaslik:"Alt Baslik2",
                image:"2.jpeg",
                anasayfa:true,
                onay:true,
            }
        ])

        await categories[0].addBlog(blogs[0]);
        await categories[0].addBlog(blogs[1]);

        await blogs[0].addCategory(categories[1]);
    } 
}

module.exports=populate;