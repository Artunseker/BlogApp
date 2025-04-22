const Blog = require("../models/blog");
const Categories = require("../models/category");
const { Op, where } = require("sequelize");


const blogs_detail =async function(req,res){
    const id =req.params.slug;

    try{
        const blogs= await Blog.findOne({
            where:{
                url:id,
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
    const size=3;
    const { page=0 }=req.query;
    const slug =req.params.slug;
    try{
        const {rows,count} = await Blog.findAndCountAll({
            where:{
                onay:true
            },
            raw:true,
            include: slug ? [{model: Categories,where:{url:slug}}] : null,
            limit:size,
            offset:page*size

        });

        const categories = await Categories.findAll({
            raw:true
        });
        
        res.render('users/blogs',{
            title:"Tüm Kurslar",
            categories:categories,
            bloglar:rows,
            selectedCategory:slug,
            totalItems:count,
            currentPage:page,
            TotalPages:Math.ceil(count/size)
            
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
    blogs_detail,
    blogs,
    anasayfa
}