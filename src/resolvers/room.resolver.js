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
    },
    Mutation: {
        newRoom: async (root, { password, game }, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)

            let createdRoom = await Room.create({
                password,
                game,
                players: [user.id],
            })

            console.log(createdRoom)

            user.gameInProgress = createdRoom.id

            await user.save()

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
