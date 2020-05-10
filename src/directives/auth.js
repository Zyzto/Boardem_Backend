import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { isLoggedIn } from '../helper'

class isLoggedInDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = function (...args) {
            const [, , context] = args
            isLoggedIn(context.args)
            return resolve.apply(this, args)
        }
    }
}

export default isLoggedInDirective
