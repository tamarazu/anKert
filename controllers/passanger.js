const { Passanger, Train, Destination, Ticket} = require('../models')

class PassangerController{
    
    //Home
    static home(req, res) {
        res.render('./passanger/home')
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
        console.log(input)
        //! NEED SESSION
        if(input.price < 500000){
            let createTickets = {
                TrainId : input.id,
                PassangerId : 1
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
    }
}

module.exports = PassangerController