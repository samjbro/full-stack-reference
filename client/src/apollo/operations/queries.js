import gql from 'graphql-tag'

const GET_CURRENT_USER = gql`
  query {
    currentUser @client {
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
      id
      name
      email
    }
  }
`

const GET_COMMENTS = gql`
  query comments {
    comments {
      id
      text
    }
  }
`

export { GET_CURRENT_USER, GET_ME, GET_HELLO_MESSAGE, GET_COMMENTS }