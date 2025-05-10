const bcrypt = require("bcrypt");
const User =require("../models/user");


const get_register = async(req, res) => {
    try{
        return res.render("auth/register", {
            title: "Kayıt Ol",
        });
    }
    catch(err){
        console.log(err);
    }
}

const post_register = async(req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user = await User.findOne({
            where: {
                email: email,
            }
        });
        if(user){
            req.session.message={text:"Email already exists",class:"warning"};
            return res.redirect("login");
        }
        await User.create({
            fullName: name,
            email: email,
            password: hashedPassword,
        });

        req.session.message={text:"Registration successful",class:"success"};
        return res.redirect("login");

    }
    catch(err){
        console.log(err);
    }
}

const get_login = async(req, res) => {
    const message = req.session.message;
    delete req.session.message;
    try{
        return res.render("auth/login", {
            title: "login",
            message: message,
        });
    }
    catch(err){
        console.log(err);
    }
}

const post_login = async(req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user=await User.findOne({
            where:{
                email:email,
            }
        });
        if(!user){
            return res.render("auth/login", {
               title: "login",
                message:{text:"Email hatalı girildi",class:"danger"}
            });
            
        }
        const match = await bcrypt.compare(password, user.password);
            
        if(match){
            req.session.isAuth=true;
            req.session.fullName=user.fullName;//login olduk login oldugunda sessiona bilgileri ekliyoruz
            const url = req.query.returnUrl || "/";
            return res.redirect(url);
        }
        else{
            return res.render("auth/login", {
                title: "login",
                message:{text:"Password is wrong",class:"danger"}
            });
        }
    } 
    catch(err){
        console.log(err);
    }      
}

const get_logout = async(req, res) => {
    try{
        await req.session.destroy();
        return res.redirect("/account/login");
    }
    catch(err){
        console.log(err);
    }
}

module.exports={
    get_register,
    post_register,
    get_login,
    post_login,
    get_logout
}