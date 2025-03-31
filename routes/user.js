const express = require("express");
const router = express.Router();

const db=require("../data/db.js"); 

router.use("/blogs/:blogid",(req,res)=>{
    
    res.render('users/blog-details');
});

router.use("/blogs",async function(req,res){
    try{
        const [blogs, ] = await db.execute("SELECT * FROM blog where onay=1 ");
        const [categories, ] = await db.execute("SELECT * FROM categories");
        
        res.render('users/blogs',{
            title:"Tüm Kurslar",
            categories:categories,
            bloglar:blogs,
        });
    }
    catch(err){
        console.log(err);
    }
});

router.use("/", async function(req,res){

    try{
        const [blogs, ] = await db.execute("SELECT * FROM blog where onay=1 and anasayfa=1");
        const [categories, ] = await db.execute("SELECT * FROM categories");

        res.render('users/index',{
            title:"Popüler Kurslar",
            categories:categories,
            bloglar:blogs,
   }); // burada html de dinamik ejs aracılığyla kullanmak için users indexe db verilerini gönderiyoruz
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;