import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import prisma from './prisma'
import resolvers from './resolvers'

const app = express()

const server = new ApolloServer({
  typeDefs: importSchema('./schema.graphql'),
  resolvers,
  context: (request) => ({ request, prisma })
})

server.applyMiddleware({ app, path: '/graphql' })


export { app as default }