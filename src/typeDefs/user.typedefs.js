import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        user(id: ID!): User
        users: [User!]!
    }
    extend type Mutation {
        register(email: String!, username: String!, password: String!): User
        login(userInput: String!, password: String!): Auth!
    }
    type User {
        id: ID!
        email: String!
        username: String!
        createdAt: String!
        updatedAt: String!
    }
    type Auth {
        token: String
    }
`
