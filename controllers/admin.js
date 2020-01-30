const {Admin, Train, Passanger, Ticket, Destination} = require('../models')
const formatcurrency = require('../helpers/formatCurrency')

class Controller{
    static login(req, res){
        res.render('admin/login.ejs', {err : null})
    }
    static checkAccount(req, res){
        const username = req.body.username
        const password = req.body.password
        Admin.findAll()
            .then(result => {
                let flag = false
                console.log(username)
                console.log(result)
                result.map(data => {
                    if(data.dataValues.username === username && data.dataValues.password === password){
                        flag = true   
                    }
                })
                console.log(flag)
                if(flag){
                    req.session.isLogin = true
                    req.session.username = username
                    console.log(req.session)
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
}

module.exports = Controller