const { Router } = require('express')
const singupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const chatroomRoutes = require('./routes/chatroom')

const router = Router()

// /api/ 
router.use('/signup', singupRoute)
router.use('/login', loginRoute)

// /api/chatroom
router.use('/chatroom', chatroomRoutes)

module.exports = router