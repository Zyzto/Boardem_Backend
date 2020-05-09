import { User } from '../models'
import { AuthenticationError } from 'apollo-server-express'
import { verify } from 'jsonwebtoken'

export default async (token) => {
    if (!token) return new AuthenticationError('User is not logged in')
    let verified = await verify(token, process.env.SECRET)
    if (!verified) return new AuthenticationError('Token is invalid relogin')
    let user = await User.findById(verified.user.id)
    if (!user) return new AuthenticationError('No User found')
    return user
}
