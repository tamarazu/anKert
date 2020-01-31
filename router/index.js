const router = require('express').Router()
const admin = require('./routerAdmin')
const passanger = require('./routerPassanger')
const Controller = require('../controllers/index')

router.get('/', (req, res) => {
    res.render('homePage')
})

router.post('/', Controller.checkLogin)

router.get('/logout', Controller.logout)

router.get('/signUp', Controller.showForm)
router.post('/signUp', Controller.addPassanger)

router.use('/admin', admin)
router.use('/passanger', passanger)

module.exports = router