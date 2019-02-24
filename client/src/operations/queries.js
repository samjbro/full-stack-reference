import gql from 'graphql-tag'

const GET_HELLO_MESSAGE = gql`
  query {
    hello
  }
`

export { GET_HELLO_MESSAGE }