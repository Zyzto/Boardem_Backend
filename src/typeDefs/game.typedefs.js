import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        games: [Game!]!
        game(id: ID!): Game!
    }
    extend type Mutation {
        newGame(
            name: String!
            isScorable: Boolean!
            gameDetails: String!
            playersLimit: Int!
            time: Int!
        ): Game
        editGame(
            id: ID!
            name: String
            isScorable: Boolean
            time: Int
            gameDetails: String
            playersLimit: Int
        ): Game
        deleteGame(id: ID!): String!
    }
    type Game {
        id: ID!
        name: String!
        isScorable: Boolean!
        gameDetails: String!
        time: Int!
    }
`
