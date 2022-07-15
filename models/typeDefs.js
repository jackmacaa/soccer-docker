const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    fees: [Fee]
  }

  type Fee {
    id: ID!,
    name: String!,
    description: String!,
    price: Int!
  }
`;

module.exports = typeDefs;