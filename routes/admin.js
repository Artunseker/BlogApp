const express = require("express");
const adminRouter = express.Router();
const fs = require("fs");
const imgupload = require("../helpers/image-upload");

const Blog = require("../models/blog");
const Categories = require("../models/category");
//categories



adminRouter.get("/category/delete/:categoryid",async function(req,res){
    const category_id=req.params.categoryid;
    try{
        const category=await Categories.findByPk(category_id);
        if(category){
            res.render('admin/category-delete',{
                title:"Delete Category",
                category:category,
            });
        }
        res.redirect("/admin/categories");
    }
    catch(err){
        console.log(err);
    }
});
adminRouter.post("/category/delete/:categoryid",async function(req,res){
    const category_id=req.body.kategoryid;
    try{
        await Categories.destroy({
            where:{
                categoryid:category_id
            }
        });
        res.redirect("/admin/categories?action=delete");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.get("/categories/:categoryid",async function(req,res){
    const category_id=req.params.categoryid;
    try{

        const category= await Categories.findByPk(category_id);
        
        if(category){
            return res.render('admin/category-edit',{
                title:category.dataValues.name,
                category:category.dataValues,
            });
        }    
        res.redirect("/admin/categories");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.post("/categories/:categoryid",async(req,res)=>{
    const IDcategory=req.params.categoryid;
    const kategori=req.body.isim;
    try{
        const category=await Categories.update({name:kategori},{
            where:{
                categoryid:IDcategory
            }
        });
        return res.redirect("/admin/categories?action=edit&categoryid="+IDcategory);
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.get("/category/create",async function(req,res){
    try{
        res.render('admin/category-create',{
            title:"Kategori Ekle",
        });
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.post("/category/create",async function(req,res){
    const kategori=req.body.isim;
    try{
        await Categories.create({
            name: kategori
        });
        res.redirect("/admin/categories?action=create");
    }
    catch(err){ 
        console.log(err);
    }
});


adminRouter.get("/categories",async(req,res)=>{
    try{
        const categories = await Categories.findAll();
        res.render('admin/category-list',{
            title:"Kategori Listesi",
            categories:categories,
            action:req.query.action,
            categoryid:req.query.categoryid,
        });
    }
    catch(err){
        console.log(err);
    }
});

//blogs

adminRouter.get("/blog/delete/:blogid",async(req,res)=>{
    const blog_id=req.params.blogid;
    try{
        const blog=await Blog.findByPk(blog_id);
        if(blog){
            return res.render('admin/blog-delete',{
                title:"Delete Blog",
                blog:blog,
            });
        }
        res.redirect("/admin/blogs");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.post("/blog/delete/:blogid",async(req,res)=>{
    const blog_id=req.body.blogid;
    try{
        const blog = await Blog.findByPk(blog_id);
        if(blog){
            blog.destroy();
            return res.redirect("/admin/blogs?action=delete");
        }
        res.redirect("/admin/blogs");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.get("/blog/create",async (req,res)=>{
    try{
        const categories = await Categories.findAll();
        res.render('admin/blog-create',{
            title:"Blog Ekleme",
            categories:categories
        });
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.post("/blog/create",imgupload.single("resim"), async(req,res)=>{
    const baslik=req.body.baslik;
    const altbaslik=req.body.altbaslik;
    const aciklama=req.body.aciklama;
    const resim=req.file.filename;
    const kategori=req.body.kategori;
    const anasayfa=req.body.anasayfa=="on" ? 1:0;
    const onay = req.body.onay=="on" ? 1:0;
    try{
        console.log(resim);
        await Blog.create({
            title: baslik,
            altbaslik: altbaslik,
            description: aciklama,
            image: resim,
            anasayfa: anasayfa,
            onay: onay,
            categoryid: kategori
        });
        res.redirect("/admin/blogs?action=create");
    }
    catch(err){
        console.log(err);
    }
});
adminRouter.get("/blogs/:blog_id",async(req,res)=>{
    const blog_id=req.params.blog_id;
    try{
        const blog=await Blog.findByPk(blog_id);
        const categories=await Categories.findAll();
        
        if(blog){
            return res.render('admin/blog-edit',{
                title:blog.dataValues.title,
                blog:blog,
                categories:categories
            });
        }
        res.redirect("/admin/blogs");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.post("/blogs/:blog_id", imgupload.single("resim"),async(req,res)=>{
    const IDblog=req.params.blog_id;
    const altbaslik=req.body.altbaslik;
    const baslik=req.body.baslik;
    const aciklama=req.body.aciklama;
    let resim=req.body.resim;

    if(req.file){
        resim=req.file.filename;

        fs.unlink("./public/images/"+req.body.resim, (err)=>{
            if(err){
                console.log(err);
            }
        });
    }
    const kategori=req.body.kategori;
    const anasayfa=req.body.anasayfa=="on" ? 1:0;
    const onay = req.body.onay=="on" ? 1:0;

    try{
        const blog=await Blog.findByPk(IDblog);
        if(!blog){
            return res.redirect("/admin/blogs");
        }else{
            blog.title=baslik;
            blog.altbaslik=altbaslik;
            blog.description=aciklama;
            blog.image=resim;
            blog.anasayfa=anasayfa;
            blog.onay=onay;
            blog.categoryid=kategori;

            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid="+IDblog);
        }    
    }
    catch(err){
        console.log(err);
    }
});


adminRouter.get("/blogs",async (req,res)=>{
    try{
        const blogs = await Blog.findAll({
            attributes: ['blogid', 'title', 'altbaslik', 'image']
        });
        res.render('admin/blog-list',{
            title:"Blog Listesi",
            bloglar:blogs,
            action:req.query.action,
            blogid:req.query.blogid

        });
    }
    catch(err){
        console.log(err);
    }
});



module.exports = adminRouter; 