import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: '/graphql'
})

const link = ApolloLink.from([
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