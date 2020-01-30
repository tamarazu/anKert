checkLogin = (req, res, next) => {
    console.log(req.session)
    if(req.session.isLogin){
        next()
    }
    else{
        res.redirect('/admin/login')
    }
}

module.exports = checkLogin