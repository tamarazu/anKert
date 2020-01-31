const router = require('express').Router()
const PassangerController = require('../controllers/passanger')
const checkLogin = require('../middleware/checkLogin')

//home
router.get('/', checkLogin, PassangerController.home)

//readByDestination
router.post('/search', checkLogin, PassangerController.trainList)

//readByDestination
router.post('/buyTicket', checkLogin, PassangerController.trainList)

//buy
router.get('/:idTrain/buy', checkLogin, PassangerController.showBuyTransaction)
router.post('/:idTrain/buy', checkLogin, PassangerController.buyValidation)

//delete
router.get('/:idTrain/:seatNumber/delete', PassangerController.delete)

//update
router.get('/profile', PassangerController.showProfile)
router.post('/profile', PassangerController.editProfile)

// Create new acoout
// router.get('/:idTrain/buy', PassangerController.showBuyTransaction)
// router.post('/:idTrain/buy', PassangerController.buyValidation)

module.exports = router