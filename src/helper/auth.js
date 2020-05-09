import { User } from '../models'
import { AuthenticationError } from 'apollo-server-express'
import { verify } from 'jsonwebtoken'

export default isLoggedIn = (token) => {
    if (!token) throw new AuthenticationError('User is not logged in')
    ;async () => {
        try {
            let verified = await verify(token, process.env.SECRET)
            console.log(verified)
            if (!verified) throw err
            let user = await User.findById(verified.id)
            if (!user) throw new AuthenticationError('No User found')
            return user
        } catch (err) {
            throw new AuthenticationError('Token is invalid relogin')
        }
    }
}
