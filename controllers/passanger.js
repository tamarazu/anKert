const { Passanger, Train, Destination, Ticket} = require('../models')

class PassangerController{
    
    //Home
    static home(req, res) {
        let id = 1
        Ticket.findAll({where : {
            PassangerId : id
        }})
          .then(tickets => {
              res.render('passanger/home', {tickets})
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
            //   res.send(information)
              res.render('./passanger/buyTicket', {information})
          })
          .catch(err => {
              res.send(err)
          })
    }

    static buyValidation(req, res){
        let { id, name, derpature, price} = req.body
        let input = { id, name, derpature, price}
        let ticketsInformation
        let trainsInformation
        let t
        let priceDummy = 500000
        let idTrainBuy = Number(input.id)
        
        console.log(input)
        //! NEED SESSION
        Train.findByPk(idTrainBuy)
          .then(trainByPk => {
              trainsInformation = trainByPk
              return Ticket.findAll({where : {
                TrainId : idTrainBuy
              }})
          })
          .then( tickets => {
              ticketsInformation = tickets
              if(ticketsInformation.length < trainsInformation.seats){
                if(trainsInformation.price < priceDummy){
                    let seatId = ticketsInformation.length
                    let createTickets = {
                        TrainId : input.id,
                        PassangerId : 1,
                        seat_number : seatId
                    }
                    Ticket.create(createTickets)
                    .then(success => {
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
}

module.exports = PassangerController