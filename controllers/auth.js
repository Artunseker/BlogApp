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


module.exports={
    get_register,
    post_register
}