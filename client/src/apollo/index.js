import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'

import defaults from './defaultState'
import resolvers from './resolvers'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: '/graphql'
})

const stateLink = withClientState({ resolvers, cache, defaults })

const link = ApolloLink.from([
  stateLink,
  httpLink
])

const apolloClient = new ApolloClient({
  link,
  cache
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

export { apolloProvider as default }