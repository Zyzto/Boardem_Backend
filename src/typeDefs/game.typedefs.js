import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        games: [Game!]!
        game(id: ID!): Game!
        roomCount(id: ID!): Int!
    }
    extend type Mutation {
        newGame(
            name: String!
            isScorable: Boolean!
            gameDetails: String!
            playersLimit: Int!
            time: Int!
            img: String!
        ): Game
        editGame(
            id: ID!
            name: String
            isScorable: Boolean
            time: Int
            gameDetails: String
            playersLimit: Int
            img: String
        ): Game
        deleteGame(id: ID!): String!
    }
    type Game {
        id: ID!
        name: String!
        isScorable: Boolean!
        gameDetails: String!
        playersLimit: Int
        time: Int!
        img: String!
        # count(id: ID!): RoomCount!
    }
    # type RoomCount {
    #     count: Int
    # }
`
