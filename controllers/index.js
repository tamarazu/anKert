const {Passanger} = require('../models')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

class Controller{
    static checkLogin(req, res){
        let {username, password} = req.body
        let input = {username, password}
        
        console.log(input)
        Passanger.findOne({where: {
            username : username
        }})
        .then(user => {
            let check = bcrypt.compareSync(input.password, user.password)
              if(check === true) {
                  req.session.isLogin = true
                  req.session.username = username
                  res.redirect('/passanger')
              } else if (input.password === user.password){
                req.session.isLogin = true
                req.session.username = username
                let failLogin = `Salah Password`
                res.redirect('/')
            } else {
                res.redirect('/')

              }
          })
          .catch(err => {
              res.send(err)
          })
    }

    static showForm(req, res){
        // res.send(`masuk`)
        res.render('./passanger/fromAddPassanger.ejs')
    }

    static addPassanger(req, res){
        let {first_name, last_name, balance, username, password} = req.body
        let input = {first_name, last_name, balance, username, password}
        Passanger.create(input)
          .then(success => {
              res.redirect('/')
          })
          .catch(err => {
              res.send(err)
          })
    }

    static logout(req, res){
        req.session.isLogin = false
        req.session.username = null
        res.redirect('/')
        console.log(req.session.username)
    }
}

module.exports = Controller