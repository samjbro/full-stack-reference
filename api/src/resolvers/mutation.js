import bcrypt from 'bcryptjs'
import { generateToken, getUserId } from '../utils'

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
    // const promise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(prisma.mutation.createComment({ data: {
    //       text: data.text,
    //       author: {
    //         connect: {
    //           id: userId
    //         }
    //       }
    //     }}, info))
    //   }, 2000)
    // })
    // return promise.then(comment => comment)
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

export { Mutation as default }