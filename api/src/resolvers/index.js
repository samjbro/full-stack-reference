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
  }
}

const resolvers = {
  Query,
  Mutation
}

export { resolvers as default }