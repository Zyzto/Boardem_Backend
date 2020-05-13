import { Game, Room } from '../models'
import { isLoggedIn } from '../helper'

export default {
    Query: {
        games: async (root, args, { req }, info) => {
            return await Game.find({})
            // console.log(room)
            // let roomCount = room.length
            // console.log(roomCount)
            // console.log((game = { game, roomCount }))
            // return (game = { game, roomCount })
        },
        game: async (root, { id }, { req }, info) => {
            return await Game.findById(id)
        },
        roomCount: async (root, { id }, { req }, info) => {
            let room = await Room.find({ game: id })
            let roomCount = room.length
            console.log(roomCount)
            return roomCount
        },
    },
    Mutation: {
        newGame: async (root, args, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)
            if (!user.isAdmin)
                return new AuthenticationError("You aren't allowed")
            return await Game.create(args)
        },
        editGame: async (root, args, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)
            if (!user.isAdmin)
                return new AuthenticationError("You aren't allowed")
            return await Game.findByIdAndUpdate(args.id, { ...args })
        },
        deleteGame: async (root, args, { id }, info) => {
            let user = await isLoggedIn(req.headers.authorization)
            if (!user.isAdmin)
                return new AuthenticationError("You aren't allowed")
            await Game.findByIdAndDelete(id)
            return 'Game Deleted'
        },
    },
}
