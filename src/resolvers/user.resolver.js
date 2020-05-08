import { User } from '../models'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import Joi from 'joi'
import { Register } from '../validations'

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
			await Joi.validate(args, Register, { abortEarly: false })
			return User.create(args)
		},
	},
}
