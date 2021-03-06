import {} from 'dotenv/config'
import { ApolloServer, gql } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import express from 'express'
import mongoose from 'mongoose'
import schemaDirectives from './directives'
import cors from 'cors'

const { PORT, DB } = process.env
;(async () => {
    try {
        mongoose.connect(
            DB,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            () => console.log(`🖥Database Connected to => ${DB}`),
            (err) => console.log(`🖥Database Error ${err}`)
        )

        const app = express()

        app.disable('x-powered-by')

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            // schemaDirectives,
            playground: true,
            context: ({ req, res }) => ({ req, res }),
            introspection: true,
        })

        const corsOptions = {
            origin: 'http://localhost:3004',
            credentials: true,
        }
        app.use(
            cors({
                origin: true,
                credentials: true,
            })
        )
        server.applyMiddleware({
            app,
            cors: false,
        })
        app.use(express.json())

        app.listen({ port: PORT }, () =>
            console.log(
                `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
            )
        )
    } catch (err) {
        console.log(`Server Can't start ${err}`)
    }
})()
