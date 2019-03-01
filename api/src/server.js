import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'
import { createServer } from 'http'

import prisma from './prisma'
import resolvers from './resolvers'

const app = express()

const server = new ApolloServer({
  typeDefs: importSchema('./schema.graphql'),
  resolvers,
  context: (request) => ({ request, prisma })
})

server.applyMiddleware({ app, path: '/graphql' })
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

export { httpServer as default }