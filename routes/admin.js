const express = require("express");
const adminRouter = express.Router();

adminRouter.use("/blog/create",(req,res)=>{
    res.render('admin/blog-create');
});

adminRouter.use("/blogs/:blog_id",(req,res)=>{
    res.render('admin/blog-edit');

});

adminRouter.use("/blogs",(req,res)=>{
    res.render('admin/blog-list');
});



module.exports = adminRouter; 