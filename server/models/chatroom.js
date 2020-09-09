const { model, Schema, SchemaTypes } = require('mongoose')

const ChatRoomSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: SchemaTypes.ObjectId, required: true, ref: 'User' }
}, { 
    timestamps: true
})

module.exports = model('Chatroom', ChatRoomSchema)