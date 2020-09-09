const { Router } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jwt-then')

const router = Router()

router.post('/', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user) {
        console.log(user)
        if(await bcrypt.compare(password, user.password)) {
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ message: "Login approved!", token: token })
        } else {
            res.status(401).json({ message: "Username or Password is wrong!" })
        }
    } else {
        res.status(404).json({ message: "User doesn't exist please signup." })
    }
})

module.exports = router