const { Router } = require('express')
const User = require('../models/user')
const jwt = require('jwt-then')

const router = Router()

router.post('/', async (req, res, next) => {
    const { username, password } = req.body
    if (!username && !password) {
        return res.json({ message: "Please provide valid username and password!" })
    }
    try {
        const user = await User.create({ username, password })
        // send token
        const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        res.json({ message: "Registered successfully!", token })
    } catch(err) {
        console.dir(err)
        res.status(503).json({ message: err.message })
    }
})

module.exports = router