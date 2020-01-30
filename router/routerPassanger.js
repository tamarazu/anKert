const router = require('express').Router()
const PassangerController = require('../controllers/passanger')

//home
router.get('/', PassangerController.home)

//readByDestination
router.post('/search', PassangerController.trainList)

//readByDestination
router.post('/buyTicket', PassangerController.trainList)

//buy
router.get('/:idTrain/buy', PassangerController.showBuyTransaction)
router.post('/:idTrain/buy', PassangerController.buyValidation)

module.exports = router