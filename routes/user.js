const express = require("express");
const router = express.Router();

const db=require("../data/db.js"); 

router.use("/blogs/categories/:categoryid",async function(req,res){
    const id=req.params.categoryid;
    
    try{
        const [blogs] = await db.execute("SELECT * FROM blog where categoryid=?",[id]);
        
        const [categories] = await db.execute("SELECT * FROM categories");
        
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
        const [blogs] = await db.execute("SELECT * FROM blog where blogid=?",[id]);
        const blog=blogs[0];

        if(blog){
            return res.render('users/blog-details',{
                title:blog.baslik,
                blog:blog,
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
        const [blogs] = await db.execute("SELECT * FROM blog where onay=1 ");//await ile sırasıyla sorgular çalışır ilk blog onay=1 i alır sonra categories i alır
        const [categories] = await db.execute("SELECT * FROM categories");
        
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
        const [blogs] = await db.execute("SELECT * FROM blog where onay=1 and anasayfa=1");
        const [categories] = await db.execute("SELECT * FROM categories");

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