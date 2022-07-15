const { knex } = require('./connection');

async function getFees() {
    const result = await knex.select().from('fees');
    return result;
}

const resolvers = {
    Query:  {
                fees: async() => await getFees()
            }     
};

module.exports = resolvers;