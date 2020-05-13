import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        me: User # @isLoggedIn
        user(id: ID!): User
        users: [User!]!
    }
    extend type Mutation {
        register(email: String!, username: String!, password: String!): User
        login(userInput: String!, password: String!): Auth!
        editUser(
            email: String
            username: String
            password: String
            newPassword: String
        ): User!
        deleteUser: String
    }
    type User {
        id: ID!
        email: String!
        username: String!
        gameInProgress: Room!
        isAdmin: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    type Auth {
        token: String
    }
`
