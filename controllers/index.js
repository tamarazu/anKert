const {Passanger} = require('../models')

class Controller{
    static checkLogin(req, res){
        let {username, password} = req.body
        let input = {username, password}

        Passanger.findOne({where: {
            username : username
        }})
          .then(user => {
              if(user.password === input.password) {
                  req.session.isLogin = true
                  req.session.username = username
                  res.redirect('/passanger')
              } else {
                  res.redirect('/')
              }
          })
          .catch(err => {
              res.send(err)
          })
    }
}

module.exports = Controller