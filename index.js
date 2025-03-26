const express = require('express');

const app = express();//uygulamamızı oluşturduk

app.use("/blogs/:blogid/users/:username",(req,res)=>{
    console.log(req.params.blogid);
    console.log(req.params.username);
    res.send("blog detay sayfası");
});

app.use("/blogs",(req,res)=>{
    res.send("blog listesi");
});

app.use("/",(req,res)=>{
    res.send("Anasayfa");
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
}); 