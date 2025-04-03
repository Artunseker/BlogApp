const express = require("express");
const adminRouter = express.Router();

const db=require("../data/db");


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

adminRouter.post("/blog/create", async(req,res)=>{
    const baslik=req.body.baslik;
    const aciklama=req.body.aciklama;
    const resim=req.body.resim;
    const kategori=req.body.kategori;
    const anasayfa=req.body.anasayfa=="on" ? 1:0;
    const onay = req.body.onay=="on" ? 1:0;
    try{
        await db.execute("Insert into blog(title,description,image,anasayfa,onay,categoryid) Values (?,?,?,?,?,?)",
            [baslik,aciklama,resim,anasayfa,onay,kategori]
        )
        res.redirect("/")
    }
    catch(err){
        console.log(err);
    }
});

adminRouter.get("/blogs/:blog_id",(req,res)=>{
    res.render('admin/blog-edit');

});

adminRouter.get("/blogs",(req,res)=>{
    res.render('admin/blog-list');
});



module.exports = adminRouter; 