import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        games: [Game!]!
        game(id: ID!): Game!
    }
    extend type Mutation {
        newGame(name: String!, maxPlayers: Int!, img: String!): Game
        editGame(id: ID!, name: String, maxPlayers: Int, img: String): Game
        deleteGame(id: ID!): String!
    }
    type Game {
        id: ID!
        name: String!
        maxPlayers: Int
        img: String!
    }
`
