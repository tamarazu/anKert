const { Passanger, Train, Destination, Ticket} = require('../models')
const nodemailer = require('nodemailer');
const formatCurrency = require('../helpers/formatCurrency')
var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ankertrain@gmail.com',
        pass: 'ankertrain123'
    }
});

class PassangerController{
    
    //Home
    static home(req, res) {
        let id = 1
        let userLogin 
        let ticketsAll
        let trainsAll
        let ticketsTrains = []
        let clearInfoTrains = []


        Passanger.findOne({
            where : {
                username : req.session.username
            }
        })
        .then(user => {
            userLogin = user
            return Ticket.findAll({ 
                where : {
                    PassangerId : userLogin.id
                }
            })
        })
        .then(tickets => {
            ticketsAll = tickets
            return Train.findAll()
        })
        .then(trains => {
            trainsAll = trains
            ticketsAll.forEach( informationTicket => {
                trainsAll.forEach(nameTrain => {
                    if(informationTicket.TrainId === nameTrain.dataValues.id){
                        let newInput = {
                            idTrain: nameTrain.id,
                            name : nameTrain.name,
                            derpature : nameTrain.derpature,
                            seat_number : informationTicket.seat_number
                        }
                        ticketsTrains.push(newInput)
                    }
                })
            })
        //   res.send(userLogin)
        res.render('passanger/home', {ticketsTrains, userLogin, formatCurrency})

        })
        .catch(err => {
            res.send(err)
        })
    }
    

    //Train List
    static showList (req, res){
        res.render('./passanger/formBuy')
    }
    
    static trainList(req, res) {
        let destination = req.body.destination
        Destination.findOne({
            where : {
                name : destination
            }
        })
            .then(city => {
                return Train.findAll({
                    where: {
                        DestinationId: city.id
                    }
                })
                
            })
            .then(trains => {
                // res.send(destination)
                res.render('./passanger/trainList', {trains, formatCurrency})
            })
            .catch(err => {
                res.send(err)
            })
    }

    //Buy Ticket
    static showBuyTransaction(req, res){
        let id = Number(req.params.idTrain)
        Train.findByPk(id)
          .then( information => {
              res.render('./passanger/buyTicket', {information})
          })
          .catch(err => {
              res.send(err)
          })
        }
        
        static buyValidation(req, res){
            let { id, name, derpature, price} = req.body
            let input = { id, name, derpature, price}
            let penumpang = req.body
            let currentBalance
            let priceTrain
            let ticketsInformation
            let trainsInformation
            let balance
            let passanger
            let idTrainBuy = Number(input.id)
            
            console.log(input)
            //! NEED SESSION
            Passanger.findOne({where : {
                username : req.session.username
            }})
            .then( user => {
                passanger = user
                console.log(passanger)
                balance = Number(user.balance)
                return Train.findByPk(idTrainBuy)
            })
            .then(trainByPk => {
                trainsInformation = trainByPk
                return Ticket.findAll({where : {
                    TrainId : idTrainBuy
                }})
            })
            .then( tickets => {
                ticketsInformation = tickets
                if((ticketsInformation.length )< trainsInformation.seats){
                if(trainsInformation.price < balance){
                    // console.log(passanger.id, "===================passanger id")
                    // console.log(user.id, "===================user id")
                    priceTrain = trainsInformation.price
                    let idSeed = passanger.id
                    let seatId = ticketsInformation.length
                    let createTickets = {
                        TrainId : input.id,
                        PassangerId : idSeed,
                        seat_number : seatId + 1
                    }
                    return Ticket.create(createTickets)
                        .then(updateBalance => {
                            let mailOptions = {
                                from: 'ankertrain@gmail.com',
                                to: penumpang.email,
                                subject: 'Konfirmasi Pembayaran Selesai',
                                text: `Terima kasih ${penumpang.name} sudah melakukan pembelian ticket kereta menggunakan AnKert!
    Berikut detail pemesananmu:
    Train : ${penumpang.name},
    Departure : ${penumpang.derpature}
    Price : Rp ${penumpang.price}`
                            };

                            transporter.sendMail(mailOptions, (err, info) => {
                                if (err) throw err;
                                console.log('Email sent: ' + info.response);
                            });
                            res.render('passanger/buySuccess')
                        })
                        .catch(err => {
                            res.send(err)
                        })
                } else {
                    res.redirect('/passanger')
                }
                } else{
                    res.send('Seat sudah Penuh!')
                }
            })
            .catch(err => {
                res.send(err)
            })
        }

        static delete(req, res){
            let id = Number(req.params.idTrain)
            let seat_number = Number(req.params.seatNumber)
            Ticket.destroy({where : {
                TrainId : id,
                seat_number : seat_number
            }})
            .then(success => {
                res.redirect('/passanger')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static showProfile(req, res){
        Passanger.findOne({where : {
            username : req.session.username
        }})
        .then(userLogin => {
            res.render('passanger/showProfile', {userLogin})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editProfile(req, res){
        let {first_name, last_name, balance, username, password} = req.body
        let data = {first_name, last_name, balance, username, password}

        console.log(data)
        Passanger.findOne({
            where : {
                username : req.session.username
            }
        })
          .then(userLogin => {
            return Passanger.update(data, {
                where : {
                    id : userLogin.id
                }
            })
          })
          .then(succes => {
            //   res.send(success)
              res.redirect('/passanger')
          })
          .catch(err => {
              res.send(err)
          })
    }
}

module.exports = PassangerController