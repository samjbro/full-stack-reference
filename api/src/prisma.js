import { Prisma } from 'prisma-binding'

const { PRISMA_HOST, PRISMA_PORT, PRISMA_SERVICE, PRISMA_STAGE, PRISMA_SECRET } = process.env

const endpoint = `http://${PRISMA_HOST}:${PRISMA_PORT}/${PRISMA_SERVICE}/${PRISMA_STAGE}`

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint,
  secret: PRISMA_SECRET
})

export { prisma as default }