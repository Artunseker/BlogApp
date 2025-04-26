const control=function(req,res,next){
    res.locals.isAuth = req.session.isAuth; //isAuth değişkenini tanımlıyoruz. Eğer sessionda isAuth yoksa false olarak ayarlıyoruz.
    res.locals.fullName = req.session.fullName; //fullName değişkenini tanımlıyoruz. Eğer sessionda fullName yoksa null olarak ayarlıyoruz.
    next();
}

module.exports = control; 