const {Admin, Train, Passanger, Ticket, Destination} = require('../models')
const formatcurrency = require('../helpers/formatCurrency')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

class Controller{
    static login(req, res){
        res.render('admin/login.ejs', {err : null})
    }
    static checkAccount(req, res){
        const username = req.body.username
        const password = req.body.password
        console.log(username)
        Admin.findAll()
            .then(result => {
                let flag = false
                result.map(data => {
                    let check = bcrypt.compareSync(username, data.dataValues.password)
                    if(data.dataValues.username === username && check){
                        flag = true   
                    }
                })
                if(flag){
                    req.session.isLogin = true
                    req.session.username = username
                    res.redirect('/admin')
                }
                else{
                    const err = 'Username / Password salah'
                    res.render('login.ejs', {err})
                }
            })
            .catch(err =>{
                res.send(err)
            })
    }
    static logout(req, res){
        req.session.isLogin = null
        req.session.username = null
        res.render('admin/login.ejs', {err : null})
    }
    static showProfile(req, res){
        Admin.findOne({
            where : {
                username : req.session.username
            }
        })
        .then(result => {
            res.render('admin/admin.ejs', {result})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static showTrains(req, res){
        Train.findAll({
            order : [['id']],
            include : Destination
        })
            .then(result => {
                res.render('admin/listTrain.ejs', {result, formatcurrency})
            })
            .catch(err => {
                res.send(err)
            })
    }
    static showDestinations(req, res){
        Destination.findAll({
            order : [['id']]
        })
            .then(result => {
                res.render('admin/listDestination.ejs', {result})
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addFormTrain(req, res){
        Destination.findAll()
            .then(result => {
                res.render('admin/formTrain.ejs', {result})
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addTrain(req, res){
        const newTrain = {
            name : req.body.name,
            DestinationId : req.body.DestinationId,
            derpature : req.body.derpature,
            price : req.body.price,
            seats : req.body.seats
        }
        Train.create(newTrain)
            .then(result => {
                res.redirect('/admin/listTrain')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static addFormDestination(req, res){
        res.render('forDestination.ejs')
    }
    static addDestination(req, res){
        const newDestination = {
            name : req.body.name
        }
        Destination.create(newDestination)
            .then(result => {
                res.redirect('/admin/listDestination')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static formUpdateTrain(req, res){
        const id = req.params.id
        let result = {}
        Train.findByPk(id)
            .then(train => {
                result = train
                return Destination.findAll()
            })
            .then(destinations => {
                // console.log()
                // res.send(result)÷
                res.render('admin/formUpdateTrain.ejs',{result, destinations})
            })
            .catch(err => {
                res.send(err)
            })
    }
    static updateTrain(req, res){
        const id = req.params.id
        const updateTrain = {
            name : req.body.name,
            DestinationId : req.body.DestinationId,
            derpature : req.body.derpature,
            price : req.body.price,
            seats : req.body.seats
        }
        Train.update(updateTrain, {where : {
            id : id
        }})
        .then(result => {
            res.redirect('/admin/listTrain')
        })
        .catch(err => {
            res.send(err)
        })
    }
    static updateDestination(req, res){
        const id = req.params.id
        const updateDestination = {
            name : req.body.name
        }
        Destination.update(updateDestination, {
            where : {
                id : id
            }
        })
        .then(result => {
            res.redirect('/admin/listdestination')
        })
        .catch(err => {
            res.send(err)
        })
    }
    static formUpdateDestination(req, res){
        const id = req.params.id
        Destination.findByPk(id)
            .then(result => {
                res.render('admin/formUpdateDestination.ejs',{result})
            })
            .catch(err => {
                res.send(err)
            })
    }
    static deleteTrain(req, res){
        const id = req.params.id
        Train.destroy({
            where : {
                id : id
            }
        })
        .then(result => {
            res.redirect('/admin/listTrain')
        })
        .catch(err => {
            res.send(err)
        })
    }
    static deleteDestination(req, res){
        const id = req.params.id
        Destination.destroy({
            where : {
                id : id
            }
        })
        .then(result => {
            res.redirect('/admin/listDestination')
        })
        .catch(err => {
            res.send(err)
        })
    }
    static formAdmin(req, res){
        res.render('admin/formAdmin.ejs')
    }
    static addAdmin(req, res){
        const newAdmin = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            username : req.body.username,
            password : req.body.password
        }
        Admin.create(newAdmin)
            .then( result => {
                res.redirect('/admin')
            })
            .catch( err => {
                res.send(err)
            })
    }
}

module.exports = Controller