const express = require("express");
const adminRouter = express.Router();

const imgupload = require("../helpers/image-upload");
const db=require("../data/db");
//categories



adminRouter.get("/category/delete/:categoryid",async function(req,res){
    const category_id=req.params.categoryid;
    try{
        const [categories]=await db.execute("Select * from categories where categoryid=?", [category_id]);
        const category=categories[0];

        res.render('admin/category-delete',{
            title:"Delete Category",
            category:category,
        });
        
    }
    catch(err){
        console.log(err);
    }
});
adminRouter.post("/category/delete/:categoryid",async function(req,res){
    const category_id=req.body.kategoryid;
    try{
        await db.execute("Delete from categories where categoryid=?", [category_id]);
        res.redirect("/admin/categories?action=delete");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.get("/categories/:categoryid",async function(req,res){
    const category_id=req.params.categoryid;
    try{
        const [categories]=await db.execute("Select * from categories where categoryid=?", [category_id]);
        const category=categories[0];

        if(category){
            return res.render('admin/category-edit',{
                title:"Edit Category",
                category:category,
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
        await db.execute("Update categories set name=? where categoryid=?", [kategori,IDcategory]);
        res.redirect("/admin/categories?action=edit&categoryid="+IDcategory);
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
        await db.execute("Insert into categories(name) Values (?)", [kategori]);
        res.redirect("/admin/categories?action=create");
    }
    catch(err){ 
        console.log(err);
    }
});


adminRouter.get("/categories",async(req,res)=>{
    try{
        const [categories] = await db.execute("SELECT * FROM categories");
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
        const [bloglar]=await db.execute("Select * from blog where blogid=?", [blog_id]);
        const blog=bloglar[0];

        res.render('admin/blog-delete',{
            title:"Delete Blog",
            blog:blog,
        });
        
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.post("/blog/delete/:blogid",async(req,res)=>{
    const blog_id=req.body.blogid;
    try{
        await db.execute("Delete from blog where blogid=?", [blog_id]);
        res.redirect("/admin/blogs?action=delete");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.get("/blog/create",async (req,res)=>{
    try{
        const [categories,]=await db.execute("Select * from categories");

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
    const aciklama=req.body.aciklama;
    const resim=req.file.filename;
    const kategori=req.body.kategori;
    const anasayfa=req.body.anasayfa=="on" ? 1:0;
    const onay = req.body.onay=="on" ? 1:0;
    try{
        console.log(resim);
        await db.execute("Insert into blog(title,description,image,anasayfa,onay,categoryid) Values (?,?,?,?,?,?)",
            [baslik,aciklama,resim,anasayfa,onay,kategori])
        res.redirect("/admin/blogs?action=create");
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.get("/blogs/:blog_id",async(req,res)=>{
    const blog_id=req.params.blog_id;
    try{
        const [bloglar]=await db.execute("Select * from blog where blogid=?", [blog_id]);
        const [categories]=await db.execute("Select * from categories");
        const blog=bloglar[0];
        
        if(blog){
            return res.render('admin/blog-edit',{
                title:blog.title,
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

adminRouter.post("/blogs/:blog_id",async(req,res)=>{
    const IDblog=req.params.blog_id;
    const baslik=req.body.baslik;
    const aciklama=req.body.aciklama;
    const resim=req.body.resim;
    const kategori=req.body.kategori;
    const anasayfa=req.body.anasayfa=="on" ? 1:0;
    const onay = req.body.onay=="on" ? 1:0;

    try{
        await db.execute("Update blog set title=?, description=?, image=?, anasayfa=?, onay=?, categoryid=? where blogid=?",
            [baslik,aciklama,resim,anasayfa,onay,kategori,IDblog]
        )
        res.redirect("/admin/blogs?action=edit&blogid="+IDblog);
    }
    catch(err){
        console.log(err);
    }
});


adminRouter.get("/blogs",async (req,res)=>{
    try{
        const [blogs] = await db.execute("SELECT blogid,title,image FROM blog");

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