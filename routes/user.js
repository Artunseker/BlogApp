const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Categories = require("../models/category");
const { Op, where } = require("sequelize");

router.use("/blogs/categories/:categoryid",async function(req,res){
    const id=req.params.categoryid;
    
    try{
        const blogs = await Blog.findAll({
            where:{
                categoryid:id,
                onay:true
            },
            raw:true
        });
        const categories = await Categories.findAll({raw:true});
        
        res.render('users/blogs',{
            title:"Tüm Kurslar",
            categories:categories,
            bloglar:blogs,
            selectedCategory:id,
        });
    }
    catch(err){
        console.log(err);
    }
    
});

router.use("/blogs/:blogid",async function(req,res){
    const id =req.params.blogid;

    try{
        const blogs= await Blog.findOne({
            where:{
                blogid:id,
                onay:true
            },
            raw:true
        });
        if(blogs){
            return res.render('users/blog-details',{
                title:blogs.baslik,
                blog:blogs,
            });
        }
        res.redirect("/blogs");
    }
    catch(err){
        console.log(err);
    }
});

router.use("/blogs",async function(req,res){
    try{
        const blogs = await Blog.findAll({
            where:{
                onay:true
            },
            raw:true
        });
        const categories = await Categories.findAll({
            raw:true
        });
        
        res.render('users/blogs',{
            title:"Tüm Kurslar",
            categories:categories,
            bloglar:blogs,
            selectedCategory:null,
        });
    }
    catch(err){
        console.log(err);
    }
});

router.use("/", async function(req,res){

    try{
        const blogs = await Blog.findAll({
            where:{
                [Op.and]:[
                    {anasayfa:true},
                    {onay:true}
                ]
            },
            raw:true
            
        });
        const categories = await Categories.findAll({raw:true});

        res.render('users/index',{
            title:"Popüler Kurslar",
            categories:categories,
            bloglar:blogs,
            selectedCategory:null,
   }); // burada html de dinamik ejs aracılığyla kullanmak için users indexe db verilerini gönderiyoruz
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;