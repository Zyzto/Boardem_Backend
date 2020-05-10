import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gameDetails: {
        type: String,
        required: true,
    },
    isScorable: {
        type: Boolean,
        required: true,
    },
})

const Game = mongoose.model('Game', gameSchema)
export default Game
