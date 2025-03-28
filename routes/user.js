const express = require("express");
const router = express.Router();

const data={
    title:"Popüler Kurslar",
    categories:[
        "Web Geliştirme",
        "Programlama",
        "Veri Bilimi",
        "Mobil Uygulama",
        "Oyun Geliştirme",
        "Yapay Zeka",
    ],
    bloglar:[
        {
            blog_id:1,
            title:"Web Geliştirme",
            description:"Web geliştirme, web siteleri ve uygulamaları oluşturma sürecidir. HTML, CSS ve JavaScript gibi dilleri kullanarak görsel tasarım ve işlevsellik sağlanır.",
            image:"1.jpeg",
            anasayfa:true,
            onay:true
        }
        ,
        {
            blog_id:2,
            title:"Programlama",
            description:"Programlama, bilgisayar yazılımlarını oluşturma sürecidir. Farklı diller (Python, Java, C++) kullanılarak algoritmalar geliştirilir.",
            image:"2.jpeg",
            anasayfa:true,
            onay:true
        },
        {
            blog_id:3,
            title:"Veri Bilimi",
            description:"Veri bilimi, verileri analiz etme ve yorumlama sürecidir. İstatistik, makine öğrenimi ve veri görselleştirme teknikleri kullanılır.",
            image:"3.jpeg",
            anasayfa:false,
            onay:true
        },
        {
            blog_id:4,
            title:"Mobil Uygulama",
            description:"Mobil uygulama geliştirme, akıllı telefonlar ve tabletler için yazılım oluşturma sürecidir. Android ve iOS platformları için farklı diller kullanılır.",
            image:"4.jpeg",
            anasayfa:false,
            onay:true
        },
        
    ]
}

router.use("/blogs/:blogid",(req,res)=>{
    res.render('users/blog-details');
});

router.use("/blogs",(req,res)=>{
    res.render('users/blogs',data);
});

router.use("/",(req,res)=>{
    res.render('users/index',data); // burada html de dinamik ejs aracılığyla kullanmak için users indexe data verilerini gönderiyoruz
});

module.exports = router;