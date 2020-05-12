import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        uploads: [File]
    }
    extend type Mutation {
        singleUpload(file: Upload!): File!
    }
    type Game {
        filename: String!
        mimetype: String!
        encoding: String!
    }
`
