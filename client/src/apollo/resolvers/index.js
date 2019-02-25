const Mutation = {
  setCurrentUser: async (_, { user }, { cache }) => {
    await cache.writeData({ data: { currentUser: user }})
    return null
  }
}

const resolvers = {
  Mutation
}

export { resolvers as default }