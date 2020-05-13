import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        rooms: [Room!]!
        room(id: ID!): Room!
        gameRooms(game: ID!): [Room!]!
    }
    extend type Mutation {
        newRoom(password: String, game: ID!): Room!
        editRoom(id: ID!, player: ID, message: String): Room!
        joinRoom(id: ID!): Room!
        changeRoomState(
            id: ID!
            currentPlayer: Int
            teamOne: ID
            teamTwo: ID
            gameState: [String]
            teamOneState: [String]
            teamTwoState: [String]
            teamOneScore: Int
            teamTwoScore: Int
        ): Room!
    }
    type Chat {
        sender: User!
        body: String!
    }
    type Room {
        id: ID!
        players: [User]
        state: State
        password: String
        chat: Chat
        game(id: ID): Game
    }
    type State {
        currentPlayer: Int
        teamOne: [User]
        teamTwo: [User]
        gameState: [String]
        teamOneState: [String]
        teamTwoState: [String]
        teamOneScore: Int
        teamTwoScore: Int
    }
`
