const { Passanger, Train, Destination, Ticket} = require('../models')

class PassangerController{
    
    //Home
    static home(req, res) {
        let id = 1
        let userLogin 
        let ticketsAll
        let trainsAll
        let ticketsTrains = []
        let clearInfoTrains = []

        Ticket.findAll({where : {
            PassangerId : id
        }})
          .then(tickets => {
            ticketsAll = tickets
            return Train.findAll()
          })
          .then(trains => {
            trainsAll = trains
               return Passanger.findOne({
                  where : {
                      username : req.session.username
                  }
              })
          })
          .then(user => {
              userLogin = user
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
            res.render('passanger/home', {ticketsTrains, userLogin})
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
                res.render('./passanger/trainList', {trains})
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
              //   res.send(information)
          })
          .catch(err => {
              res.send(err)
          })
    }

    static buyValidation(req, res){
        let { id, name, derpature, price} = req.body
        let input = { id, name, derpature, price}
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
            console.log(ticketsInformation)
            if((ticketsInformation.length )< trainsInformation.seats){
            if(trainsInformation.price < balance){
                priceTrain = trainsInformation.price
                let seatId = ticketsInformation.length
                let createTickets = {
                    TrainId : input.id,
                    PassangerId : 1,
                    seat_number : seatId + 1
                }
                let currentBalanceUser = balance - priceTrain
                console.log(passanger.id)
                return Ticket.create(createTickets)
                    // .then(ticketCreateNew => {
                    //     let input = {
                    //         id : passanger.id,
                    //         first_name,
                    //         last_name, 
                    //         balance : currentBalanceUser,
                    //         password,  
                    //     }
                    //     console.log(currentBalanceUser, '=====================')
                    //     // return Passanger.update(input, {
                    //     //     where : {
                    //     //         id : passanger.id
                    //     //     }
                    //     // })
                    // })
                    .then(updateBalance => {
                        res.redirect('/passanger')
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