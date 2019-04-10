import gql from 'graphql-tag'

const SUB_TO_COMMENTS = gql`
  subscription comments {
    comment {
      mutation
      node {
        id
        text
        createdAt
        author {
          id
          name
        }
      }
    }
  }
`

export { SUB_TO_COMMENTS }