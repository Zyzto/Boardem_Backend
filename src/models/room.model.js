import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    chat: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
            },
        },
    ],
    state: {
        type: Object,
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
    },
    password: {
        type: String,
    },
})

const Room = mongoose.model('Room', roomSchema)
export default Room
