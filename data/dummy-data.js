const Category = require('../models/category');
const Blog = require('../models/blog');
const slug = require('../helpers/slugfield.js');
const User = require('../models/user');
const bcrypt = require("bcrypt");


async function populate(){
    const count=await Category.count();

    if(count==0){
        const categories=await Category.bulkCreate([
            {name:"mobile",url:slug("mobile")},
            {name:"laptop",url:slug("laptop")},
            {name:"tablet",url:slug("tablet")},
        ]);

        const users =await User.bulkCreate([
            {
                fullName:"Admin",
                email:"artunseker2005@gmail.com",
                password:await bcrypt.hash("123", 10)
            },{
                fullName:"2123",
                email:"2123@gmail.com",
                password:await bcrypt.hash("123", 10)
            }
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
            },{
                title:"Blog Title3",
                url:slug("Blog Title3"),
                description:"Blog Description3",
                altbaslik:"Alt Baslik3",
                image:"3.jpeg",
                anasayfa:true,
                onay:true,
               
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },{
                title:"Blog Title4",
                url:slug("Blog Title4"),
                description:"Blog Description4",
                altbaslik:"Alt Baslik4",
                image:"4.jpeg",
                anasayfa:true,
                onay:true,
            },
        ])

        await categories[0].addBlog(blogs[0]);
        await categories[0].addBlog(blogs[1]);

        await blogs[0].addCategory(categories[1]);
    } 
}

module.exports=populate;