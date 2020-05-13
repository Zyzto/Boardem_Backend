import { Room, User } from '../models'
import { isLoggedIn } from '../helper'

export default {
    Query: {
        rooms: async (root, args, { req }, info) => {
            return await Room.find({})
        },
        room: async (root, { id }, { req }, info) => {
            return await Room.findById(id)
        },
        gameRooms: async (root, { game }, { req }, info) => {
            return await Room.find({ game })
                .populate('players')
                .populate('game')
        },
    },
    Mutation: {
        newRoom: async (root, args, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)

            let cr = { ...args, players: [user.id] }

            let createdRoom = await Room.create({
                ...cr,
            })

            console.log(createdRoom)

            let updatedUser = await User.findByIdAndUpdate(user.id, {
                gameInProgress: createdRoom.id,
            })

            console.log(updatedUser)

            return createdRoom
        },
        editRoom: async (root, args, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)

            return await Room.findByIdAndUpdate(args.id, { ...args })
        },
        joinRoom: async (root, { id }, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)

            let room = await (await Room.findById(id)).populated('game')

            if (room.game.playersLimit <= room.players.length())
                room.players = room.players.push(user.id)

            user.gameInProgress = room.id

            await user.save()

            return await room.save()
        },
    },
}
