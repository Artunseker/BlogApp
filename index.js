const express = require('express');
const path = require('path');

const app = express();//uygulamamızı oluşturduk

app.use("/libraries",express.static("node_modules"));//takma isim libraries, html gibi static dosyalar için kullanılır
app.use("/static",express.static("public"));//public klasör dosyalar için kullanılır fakat static adı ile html de kullanılır. Çünkü daha güvenlidir.

app.use("/blogs/:blogid",(req,res)=>{
    console.log(__dirname);
    console.log(__filename);

    res.sendFile(path.join(__dirname, 'views/users',"blog-details.html"));
});

app.use("/blogs",(req,res)=>{
    res.sendFile(path.join(__dirname, 'views/users',"blogs.html"));
});

app.use("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'views/users',"index.html"));
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
}); 