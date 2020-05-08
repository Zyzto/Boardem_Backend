import { User } from '../models'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Joi from '@hapi/joi'
import { RegisterValidate } from '../validations'

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
    },
}
