const Category = require('../models/category');
const Blog = require('../models/blog');
const slug = require('../helpers/slugfield.js');

async function populate(){
    const count=await Category.count();

    if(count==0){
        const categories=await Category.bulkCreate([
            {name:"mobile",url:slug("mobile")},
            {name:"laptop",url:slug("laptop")},
            {name:"tablet",url:slug("tablet")},
        ]);
        const blogs =await Blog.bulkCreate([
            {
                title:"Blog Title",
                url:slug("Blog Title"),
                description:"Blog Description",
                altbaslik:"Alt Baslik",
                image:"1.jpeg",
                anasayfa:true,
                onay:true,
               
            },
            {
                title:"Blog Title2",
                url:slug("Blog Title2"),
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