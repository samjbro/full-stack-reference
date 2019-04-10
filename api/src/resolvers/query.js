import { getUserId, fakeDelay } from '../utils'

export default {
  me (parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.query.user({
      where: {
        id: userId
      }
    })
  },
  async comments (parent, args, { prisma }, info) {
    await fakeDelay(1000)
    return prisma.query.comments({}, info)
  }
}