const router = require('express').Router()
const admin = require('./routerAdmin')
const passanger = require('./routerPassanger')
const Controller = require('../controllers/index')

router.get('/', (req, res) => {
    res.render('homePage')
})
router.post('/', Controller.checkLogin)

router.use('/admin', admin)
router.use('/passanger', passanger)

module.exports = router