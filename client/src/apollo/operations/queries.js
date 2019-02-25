import gql from 'graphql-tag'

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
      email
    }
  }
`

const GET_HELLO_MESSAGE = gql`
  query {
    hello
  }
`

const GET_ME = gql`
  query me {
    me {
      name
      email
    }
  }
`

export { GET_CURRENT_USER, GET_ME, GET_HELLO_MESSAGE }