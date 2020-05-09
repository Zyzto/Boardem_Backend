import { User } from '../models'
import mongoose from 'mongoose'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import Joi from '@hapi/joi'
import { RegisterValidate } from '../validations'
import { hash, compare, compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { isLoggedIn } from '../helper'

export default {
    Query: {
        me: async (root, ags, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)
            if (user) return await User.findById(user.id)
        },
        users: (root, args, context, info) => {
            return User.find({})
        },
        user: (root, { id }, context, info) => {
            console.log('id:', id)
            if (mongoose.Types.ObjectId.isValid(id)) return User.findById(id)
            else throw UserInputError(id + ' is not vaild information')
        },
    },
    Mutation: {
        register: async (root, args, context, info) => {
            //TODO not auth

            // * validation
            const { error, value } = await RegisterValidate.validate(args, {
                abortEarly: false,
            })
            if (error) return error
            if (value) return User.create(args)
        },
        login: async (root, { userInput, password }, context, info) => {
            let user = null
            // * check if input is email
            let { error, _ } = await Joi.string().email().validate(userInput)
            // * find email if input is email type
            if (!error) user = await User.findOne({ email: userInput })
            // * find username if not email type
            if (error) user = await User.findOne({ username: userInput })
            // * check if password is correct password
            if (user && password) {
                if (!(await compareSync(password, user.password)))
                    throw new AuthenticationError('Invalid Password')
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
            } else throw new AuthenticationError(`${userInput} is not found`)
        },
    },
}
