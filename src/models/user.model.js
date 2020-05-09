import mongoose from 'mongoose'
import { hash } from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            validate: {
                validator: (username) => User.doesntExist({ username }),
                message: ({ value }) => `${value} has already been taken`, //TODO security
            },
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: (email) => User.doesntExist({ email }),
                message: ({ value }) => `${value} has already been taken`, //TODO security
            },
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
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
    { timestamps: true }
)

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10)
    }
})

userSchema.statics.doesntExist = async function (options) {
    return (await this.where(options).countDocuments()) === 0
}

const User = mongoose.model('User', userSchema)
export default User
