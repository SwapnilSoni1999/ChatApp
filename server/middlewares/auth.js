const jwt = require('jwt-then')

const verify = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ message: "No token provided!" })
        }

        const user = await jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = user.id
        console.log("Middleware:", req.body)
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized!" })
    }
}

module.exports = verify