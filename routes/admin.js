const express = require("express");
const adminRouter = express.Router();

const db=require("../data/db");


adminRouter.use("/blog/create",async (req,res)=>{
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

adminRouter.use("/blogs/:blog_id",(req,res)=>{
    res.render('admin/blog-edit');

});

adminRouter.use("/blogs",(req,res)=>{
    res.render('admin/blog-list');
});



module.exports = adminRouter; 