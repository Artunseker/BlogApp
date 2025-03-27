const express = require("express");
const path = require("path");
const adminRouter = express.Router();

adminRouter.use("/blog/create",(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/admin',"blog-create.html"));
});

adminRouter.use("/blogs/:blog_id",(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/admin',"blog-edit.html"));

});

adminRouter.use("/blogs",(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/admin',"blog-list.html"));
});



module.exports = adminRouter; 