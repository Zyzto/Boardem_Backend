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
            return await isLoggedIn(req.headers.authorization)
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
                    token: `Bearer ${sign(payload, process.env.SECRET, {
                        issuer: user.email,
                    })}`,
                }
            } else throw new AuthenticationError(`${userInput} is not found`)
        },
        editUser: async (root, args, { req }, info) => {
            console.log('REQ ', req.headers)
            let user = await isLoggedIn(req.headers.authorization)
            console.log(args.password)
            console.log(user)
            if (!(await compareSync(args.password, user.password)))
                throw new AuthenticationError('Invalid Password')
            console.log('ARGS 1 ', args)
            if (args.newPassword) {
                console.log('here')
                args.password = args.newPassword
                delete args.newPassword
            }
            delete args.password
            console.log('ARGS 2 ', args)
            console.log('User ', user)
            return await User.findByIdAndUpdate(
                user.id,
                { ...args },
                { new: true }
            )
        },
        deleteUser: async (root, args, { req }, info) => {
            let user = await isLoggedIn(req.headers.authorization)

            await User.findByIdAndDelete(user.id)
            return `${user.username} has been deleted`
        },
    },
}
