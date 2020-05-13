import { User } from '../models'
import { AuthenticationError } from 'apollo-server-express'
import { verify } from 'jsonwebtoken'

export default async (token) => {
    console.log('TOken ',token)
    if (!token) return new AuthenticationError('Token is invalid')
    token = token.split(' ')
    if (token[0] !== 'Bearer')
        return new AuthenticationError('Token is invalid')
    let verified = await verify(token[1], process.env.SECRET)
    if (!verified) return new AuthenticationError('Token is invalid')
    let user = await User.findById(verified.user.id)
    if (!user) return new AuthenticationError('No User found')
    // console.log(user)
    return user
}
