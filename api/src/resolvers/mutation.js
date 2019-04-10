import bcrypt from 'bcryptjs'

import { generateToken, getUserId, fakeDelay } from '../utils'

export default {
  async login (parent, { data }, { prisma }, info) {
    const errorMessage = 'Unable to login'
    const user = await prisma.query.user({
      where: {
        email: data.email
      }
    })
    if (!user) throw new Error(errorMessage)

    const isMatch = bcrypt.compare(data.password, user.password)
    if (!isMatch) throw new Error(errorMessage)

    return {
      token: generateToken(user.id),
      user
    }
  },
  async addComment (parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request)
    await fakeDelay(500)
    return prisma.mutation.createComment({ data: {
      text: data.text,
      author: {
        connect: {
          id: userId
        }
      }
    }}, info)
  }
}