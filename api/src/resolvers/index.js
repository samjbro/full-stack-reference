import bcrypt from 'bcryptjs'
import { generateToken, getUserId } from '../utils'

const Query = {
  me (parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.query.user({
      where: {
        id: userId
      }
    })
  },
  async comments (parent, args, { prisma }, info) {
    const opArgs = {}
    if (args.query) {
      opArgs.where = {
        text_contains: args.query
      }
    }
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(prisma.query.comments(opArgs, info))
      }, 2000)
    })
    return promise.then(comments => comments)

    // await setTimeout(() => {
    //   return prisma.query.comments(opArgs, info)
    // }, 2000)
  },
  hello () {
    return 'Hello World'
  }
}

const Mutation = {
  async login (parent, { data }, { prisma }, info) {
    const errorMessage = 'Unable to login'
    const user = await prisma.query.user({
      where: {
        email: data.email
      }
    })
    if (!user) {
      throw new Error(errorMessage)
    }
    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new Error(errorMessage)
    }

    return {
      user,
      token: generateToken(user.id)
    }
  },

  async addComment (parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request)
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(prisma.mutation.createComment({ data: {
          text: data.text,
          author: {
            connect: {
              id: userId
            }
          }
        }}, info))
      }, 2000)
    })
    return promise.then(comment => comment)
    // return prisma.mutation.createComment({ data: {
      // text: data.text,
      // author: {
        // connect: {
          // id: userId
        // }
      // }
    // }}, info)
  }
}

const resolvers = {
  Query,
  Mutation
}

export { resolvers as default }