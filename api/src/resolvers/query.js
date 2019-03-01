import { getUserId } from '../utils'

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
    return await prisma.query.comments(opArgs, info)
    // const promise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(prisma.query.comments(opArgs, info))
    //   }, 2000)
    // })
    // return promise.then(comments => comments)
  },
  hello () {
    return 'Hello World'
  }
}

export { Query as default }