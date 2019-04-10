import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'

import resolvers from './resolvers'
import defaultState from './state'

Vue.use(VueApollo)

const cache = new InMemoryCache()

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      if (message === 'jwt expired') {
        localStorage.removeItem('token')
        apolloClient.resetStore()
      }
      console.log(
        `[GraphQL Error]: Message ${message} Location ${locations} Path ${path}`)
    })
  }
  if(networkError) {
    console.log(`[Network Error]: ${networkError}`)
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://${window.location.host}/graphql`,
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: '/graphql'
})

const splitLink = ApolloLink.split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const link = new ApolloLink.from([
  authLink,
  errorLink,
  splitLink
])

const apolloClient = new ApolloClient({
  resolvers,
  link,
  cache
})

cache.writeData({
  data: defaultState
})

apolloClient.onResetStore(() => {
  cache.writeData({
    data: defaultState
  })
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export { apolloProvider as default, apolloClient }