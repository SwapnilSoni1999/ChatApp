const { Router } = require('express')
const singupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')

const router = Router()

// /api/ 
router.use('/signup', singupRoute)
router.use('/login', loginRoute)

module.exports = router