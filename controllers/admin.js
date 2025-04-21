const Blog = require("../models/blog");
const Categories = require("../models/category");
const fs = require("fs");
const { Op, where } = require("sequelize");
const sequelize = require("../data/db.js");
const slugify = require("../helpers/slugfield.js");

const admin_get_delete_category = async function(req,res){
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
}
const admin_post_delete_category = async function(req,res){
    const category_id=req.body.kategoryid;
    try{
        await Categories.destroy({
            where:{
                id:category_id
            }
        });
        res.redirect("/admin/categories?action=delete");
    }
    catch(err){
        console.log(err);
    }
}
const admin_get_delete_blog=async(req,res)=>{
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
}
const admin_post_delete_blog=async(req,res)=>{
    const blog_id=req.body.blogid;
    try{
        const blog = await Blog.findByPk(blog_id);
        if(blog){
            await blog.destroy();
            return res.redirect("/admin/blogs?action=delete");
        }
        res.redirect("/admin/blogs");
    }
    catch(err){
        console.log(err);
    }
}
const post_category_remove=async function(req,res){
    const category_id=req.body.categoryid;
    const blog_id=req.body.blogid;
    await sequelize.query("DELETE FROM blogCategories WHERE blogId=? AND categoryId=?",{
        replacements:[blog_id,category_id]
    });
    res.redirect("/admin/categories/" + category_id + "?action=Cat");
}
const admin_get_create_category=async function(req,res){
    try{
        res.render('admin/category-create',{
            title:"Kategori Ekle",
        });
    }
    catch(err){
        console.log(err);
    }
}
const admin_post_create_category=async function(req,res){
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
}
const admin_get_create_blog=async (req,res)=>{
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
}
const admin_post_create_blog=async(req,res)=>{
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
            url: slugify(baslik),
            altbaslik: altbaslik,
            description: aciklama,
            image: resim,
            anasayfa: anasayfa,
            onay: onay,
            categoryId: kategori
        });
        res.redirect("/admin/blogs?action=create");
    }
    catch(err){
        console.log(err);
    }
}
const admin_get_edit_category=async function(req,res){
    const category_id=req.params.categoryid;
    const action=req.query.action;
    try{

        const category= await Categories.findByPk(category_id);
        const blogs= await category.getBlogs();
        const countBlog=await category.countBlogs();

        if(category){
            return res.render('admin/category-edit',{
                title:category.dataValues.name,
                category:category.dataValues,
                bloglar:blogs,
                countBlog:countBlog,
                action: action || "" 
            });
        }    
        res.redirect("/admin/categories");
    }
    catch(err){
        console.log(err);
    }
}
const admin_post_edit_category=async(req,res)=>{
    const IDcategory=req.params.categoryid;
    const kategori=req.body.isim;
    try{
        const category=await Categories.update({name:kategori},{
            where:{
                id:IDcategory
            }
        });
        return res.redirect("/admin/categories?action=edit&categoryid="+IDcategory);
    }
    catch(err){
        console.log(err);
    }
}
const admin_get_edit_blog=async(req,res)=>{
    const blog_id=req.params.blog_id;
    try{
        const blog=await Blog.findOne({
            where:{
                id:blog_id
            },
            include:{
                model:Categories,
                attributes:['id']
            }
        });
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
}
const admin_post_edit_blog=async(req,res)=>{
    const IDblog=req.params.blog_id;
    const altbaslik=req.body.altbaslik;
    const baslik=req.body.baslik;
    const aciklama=req.body.aciklama;
    const kategoriIds =req.body.categories;
    const url=req.body.url;

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
        const blog=await Blog.findOne({
            where:{
                id:IDblog
            },
            include:{
                model:Categories,
                attributes:['id']
            }
        });
        if(!blog){
            return res.redirect("/admin/blogs");
        }else{
            blog.title=baslik;
            blog.altbaslik=altbaslik;
            blog.description=aciklama;
            blog.image=resim;
            blog.anasayfa=anasayfa;
            blog.onay=onay;
            blog.categoryId=kategori;
            blog.url=url;

            if(kategoriIds==undefined){
                await blog.removeCategories(blog.categories);
            }else{
                await blog.removeCategories(blog.categories);
                const selectedCategories = await Categories.findAll({
                    where:{
                        id:{
                            [Op.in]:kategoriIds
                        }
                    }
                });
                await blog.addCategories(selectedCategories);
            }

            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid="+IDblog);
        }    
    }
    catch(err){
        console.log(err);
    }
}
const admin_get_blogs=async (req,res)=>{
    try{
        const blogs = await Blog.findAll({
            attributes: ['id', 'title', 'altbaslik', 'image'],
            include:{
                model: Categories,
                attributes: ['name'],
            }
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
}
const admin_get_categories=async(req,res)=>{
    try{
        const categories = await Categories.findAll();
        res.render('admin/category-list',{
            title:"Kategori Listesi",
            categories:categories,
            action:req.query.action,
            categoryId:req.query.categoryid,
        });
    }
    catch(err){
        console.log(err);
    }
}
module.exports={
    admin_get_delete_category,
    admin_post_delete_category,
    admin_get_delete_blog,
    admin_post_delete_blog,
    admin_get_create_category,
    admin_post_create_category,
    admin_get_create_blog,
    admin_post_create_blog,
    admin_get_edit_category,
    admin_post_edit_category,
    admin_get_edit_blog,
    admin_post_edit_blog,
    admin_get_blogs,
    admin_get_categories,
    post_category_remove,
};