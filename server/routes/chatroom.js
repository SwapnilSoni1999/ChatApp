const { Router } = require('express')
const Chatroom = require('../models/chatroom')
const auth = require('../middlewares/auth')

const router = Router()

router.get('/all', async (req, res) => {
    res.json(await Chatroom.find({}).populate('owner'))
})

router.post('/create', auth, async (req, res) => {
    const { name, userId } = req.body

    const nameChecker = new RegExp(/^[A-Za-z\s]+$/g)

    if(!name && !nameChecker.test(name)) {
        return res.status(401).json({ message: "Enter valid name." })
    }

    const chatroomExists = await Chatroom.findOne({ name })
    if (chatroomExists) {
        return res.status(409).json({ message: "Chatroom Already exists with name " + name })
    }
    console.log(userId)
    const chatroom = await Chatroom.create({ name: name, owner: userId })
    res.json({ message: "Successfully created chatroom!", chatroom })

})

router.delete('/:chatroomId', auth, async (req, res) => {
    try {
        const { chatroomId } = req.params
        console.log('ChatroomId:', chatroomId)
        const { userId } = req.body
        const chatroom = await Chatroom.findOne({ _id: chatroomId, owner: userId })
        // check if chatroom exists
        if (chatroom) {
            // it exists
            if (chatroom.owner == userId) {
                await Chatroom.deleteOne({ _id: chatroomId })
                res.json({ message: "Deleted chatroom successfully!" })
            } else {
                res.json({ message: "You don't own this chatroom!" })
            }
        } else {
            // it doesn't
            res.json({ message: "No chatroom exists with this id." })
        }
    } catch(err) {
        res.status(501).json({ message: "Some error while deleting chatroom!" })
    }
})

module.exports = router