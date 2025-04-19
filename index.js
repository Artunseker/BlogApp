const express = require('express');

const app = express();//uygulamamızı oluşturduk

app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));


const userRouter = require('./routes/user');//user.js dosyasını dahil ettik
const adminRouter = require('./routes/admin');

app.use("/libraries",express.static("node_modules"));//takma isim libraries, html gibi static dosyalar için kullanılır
app.use("/static",express.static("public"));//public klasör dosyalar için kullanılır fakat static adı ile html de kullanılır. Çünkü daha güvenlidir.

app.use("/admin",adminRouter);//burada her admin ile başlayan route adminRouter'a gider
app.use(userRouter);//user.js dosyasını kullanmaya başlıyoruz

//ilişkiler
//One to Many
const Categories = require('./models/category.js');
const Blog = require('./models/blog.js');

Categories.hasMany(Blog,{
    foreignKey: {
        name:"categoryId",
        allowNull:false,
        //defaultValue:1
    },
    // onDelete:"SET NULL",
    // onUpdate:"RESTRICT"
});
Blog.belongsTo(Categories);

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
