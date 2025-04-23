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
        await User.create({
            fullName: name,
            email: email,
            password: hashedPassword,
        });
        return res.redirect("login");
    }
    catch(err){
        console.log(err);
    }
}

const get_login = async(req, res) => {
    try{
        return res.render("auth/login", {
            title: "login",
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
                message:"Email or password is incorrect"
            });
        }
        const match = await bcrypt.compare(password, user.password);
            
        if(match){
                //login olduk login oldugunda sessiona useri ekliyoruz
            return res.redirect("/");
        }
        else{
            return res.render("auth/login", {
                title: "login",
                message:"password is incorrect"
            });
        }
    } 
    catch(err){
        console.log(err);
    }      
}

module.exports={
    get_register,
    post_register,
    get_login,
    post_login
}