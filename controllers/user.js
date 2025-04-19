const Blog = require("../models/blog");
const Categories = require("../models/category");
const { Op, where } = require("sequelize");

const blogs_by_category = async function(req,res){
    const id=req.params.categoryid;
    
    try{
        const blogs = await Blog.findAll({
            where:{
                categoryId:id,
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
    
}
const blogs_detail =async function(req,res){
    const id =req.params.blogid;

    try{
        const blogs= await Blog.findOne({
            where:{
                id:id,
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
}
const blogs=async function(req,res){
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
}
const anasayfa=async function(req,res){

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
}
module.exports={
    blogs_by_category,
    blogs_detail,
    blogs,
    anasayfa
}