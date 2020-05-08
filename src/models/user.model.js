import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			captilze: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [6, 'Password minimum length is 6 character'],
		},
		gameInProgress: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
)

UserSchema.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await hash(this.password, 10)
	}
})

const User = mongoose.model('User', UserSchema)
export default User
