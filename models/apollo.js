const { ApolloServer, gql  }  = require('apollo-server');
//const database = require('./database')
const { Sequelize, DataTypes } = require('sequelize');

// CONFIG
const sequelize = new Sequelize('soccer', 'root', '', {
  host: 'localhost',
  dialect:  'mysql'
});

// TESTING CONNECTION
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const Fee = sequelize.define('Fee', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// `sequelize.define` also returns the model
console.log(Fee === sequelize.models.Fee); // true

const typeDefs = gql`
  type Query {
    fees: [Fee]
  }

  type Fee {
    id: ID!,
    name: String,
    description: String,
    price: Int
  }
`;

const resolvers = {
    Query:  {
                fees : Fee.findOne()
            }     
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`GraphQL Server on ${url} 🚀`);
});

