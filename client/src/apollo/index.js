import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import defaults from './defaultState'
import resolvers from './resolvers'
import { request } from 'https';

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

const requestLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    let handle
    Promise.resolve(operation)
      .then(oper =>
        request(oper)
      )
      .then(() => 
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer)
        })
      )
      .catch(observer.error.bind(observer))

      return () => {
        if (handle)
          handle.unsubscribe()
      }
  })
})


const wsLink = ApolloLink.from([
  authLink,
  errorLink,
  requestLink,
  new WebSocketLink({
    uri: `ws://${window.location.host}/graphql`,
    options: {
      reconnect: true
    }
  })
])

const httpLink = ApolloLink.from([
  authLink,
  errorLink,
  requestLink,
  new HttpLink({
    uri: '/graphql'
  })
])


const splitLink = ApolloLink.split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const link = ApolloLink.from([
  stateLink,
  splitLink
])

const apolloClient = new ApolloClient({
  link,
  cache
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

export { apolloProvider as default, apolloClient }