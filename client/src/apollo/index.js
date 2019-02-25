import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'

import defaults from './defaultState'
import resolvers from './resolvers'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      if (message === 'jwt expired') {
        localStorage.removeItem('token')
        apolloClient.resetStore()
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  if (networkError)
    console.log(`[Network error]: ${networkError}`)
})

const stateLink = withClientState({ resolvers, cache, defaults })

const link = ApolloLink.from([
  authLink,
  errorLink,
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