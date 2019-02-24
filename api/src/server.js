import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import resolvers from './resolvers'

const app = express()

const server = new ApolloServer({
  typeDefs: importSchema('./schema.graphql'),
  resolvers
})

server.applyMiddleware({ app, path: '/graphql' })


export { app as default }