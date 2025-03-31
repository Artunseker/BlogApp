const express = require('express');
const path = require('path');

const app = express();//uygulamamızı oluşturduk

app.set("view engine","ejs");



const userRouter = require('./routes/user');//user.js dosyasını dahil ettik
const adminRouter = require('./routes/admin');

app.use("/libraries",express.static("node_modules"));//takma isim libraries, html gibi static dosyalar için kullanılır
app.use("/static",express.static("public"));//public klasör dosyalar için kullanılır fakat static adı ile html de kullanılır. Çünkü daha güvenlidir.

app.use("/admin",adminRouter);//burada her admin ile başlayan route adminRouter'a gider
app.use(userRouter);//user.js dosyasını kullanmaya başlıyoruz


app.listen(8000, () => {
    console.log('Server is running on port 8000');
}); 
