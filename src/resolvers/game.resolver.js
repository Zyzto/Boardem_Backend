import { Game } from '../models'

export default {
    Query: {
        games: async (root, args, { req }, info) => {
            return await Game.find({})
        },
        game: async (root, { id }, { req }, info) => {
            return await Game.findById(id)
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
