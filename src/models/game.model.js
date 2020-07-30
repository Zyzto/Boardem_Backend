import mongoose from 'mongoose'
import { number } from '@hapi/joi'

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    maxPlayers: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
})

const Game = mongoose.model('Game', gameSchema)
export default Game
