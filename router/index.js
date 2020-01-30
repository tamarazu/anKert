const router = require('express').Router()
const admin = require('./routerAdmin')
const passanger = require('./routerPassanger')

router.get('/', (req, res) => res.send('home'))
router.use('/admin', admin)
router.use('/passanger', passanger)

module.exports = router