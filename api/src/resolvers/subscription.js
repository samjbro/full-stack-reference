const Subscription = {
  comment: {
    async subscribe (parent, data, { prisma }, info) {
      return await prisma.subscription.comment({}, info)
    }
  }
}

export { Subscription as default }