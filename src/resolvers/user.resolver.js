import { User } from '../models'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Joi from '@hapi/joi'
import { RegisterValidate } from '../validations'
import { hash, compare, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export default {
    Query: {
        users: (root, args, context, info) => {
            return User.find({})
        },
        user: (root, { id }, context, info) => {
            console.log('id:', id)
            if (mongoose.Types.ObjectId.isValid(id)) return User.findById(id)
            else throw UserInputError(id + 'is not vaild information')
        },
    },
    Mutation: {
        register: async (root, args, context, info) => {
            //TODO not auth

            //TODO validation
            const { error, value } = await RegisterValidate.validate(args, {
                abortEarly: false,
            })
            if (error) return error
            if (value) return User.create(args)
        },
        login: async (root, { userInput, password }, context, info) => {
            let user = null
            let { error, _ } = await Joi.string().email().validate(userInput)
            console.log('ERROR : ', error)
            if (!error) user = await User.findOne({ email: userInput })
            if (error) user = await User.findOne({ username: userInput })

            if (user && password) {
                console.log('here')
                let isMatch = await compareSync(password, user.password)
                if (!isMatch) return 'Wrong Password'
                const payload = {
                    user: {
                        id: user._id,
                    },
                }
                return {
                    token: sign(payload, process.env.SECRET, {
                        issuer: user.email,
                    }),
                }
            }
        },
    },
}
