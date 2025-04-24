const express = require('express');
const session=require("express-session");
const app = express();//uygulamamızı oluşturduk
const cookie=require("cookie-parser");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(cookie());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 gün
    }
}));

const userRouter = require('./routes/user');//user.js dosyasını dahil ettik
const adminRouter = require('./routes/admin');
const AuthRouter = require('./routes/auth.js');

app.use("/libraries",express.static("node_modules"));//takma isim libraries, html gibi static dosyalar için kullanılır
app.use("/static",express.static("public"));//public klasör dosyalar için kullanılır fakat static adı ile html de kullanılır. Çünkü daha güvenlidir.

app.use("/admin",adminRouter);//burada her admin ile başlayan route adminRouter'a gider
app.use(userRouter);//user.js dosyasını kullanmaya başlıyoruz
app.use("/account",AuthRouter);
//ilişkiler
const Categories = require('./models/category.js');
const Blog = require('./models/blog.js');
const User = require('./models/user.js');

Blog.belongsTo(User,{foreignKey:{allowNull:true}}); //Blog modelinin userId ile User modeline bağlanmasını sağlıyoruz. foreignKey ile hangi anahtarın kullanılacağını belirtiyoruz.
User.hasMany(Blog); //Bir user birden fazla bloga sahip olabilir

Blog.belongsToMany(Categories,{through:'blogCategories'});
Categories.belongsToMany(Blog,{through:'blogCategories'});

const sequelize = require('./data/db.js');
const DummyData = require('./data/dummy-data.js');

//IIFE
(async() => {
    await sequelize.sync({force:true});//veritabanı ile bağlantı kuruyoruz. force:true olursa veritabanını sıfırlar. false olursa sıfırlamaz.
    await DummyData();//dummy-data.js dosyasındaki populate fonksiyonunu çalıştırıyoruz. Bu fonksiyon veritabanını dolduruyor.
})();

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
