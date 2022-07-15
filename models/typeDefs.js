const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    fees: [Fee]
  }

  type Fee {
    id: ID!,
    name: String!,
    description: String!,
    price: Int!,
    stripe_id: String!
  }
`;

const getFeesQuery = gql`
query Query {
    fees {
    id
    description
    name
    price
    stripe_id
    }
}`

module.exports = { typeDefs, getFeesQuery };