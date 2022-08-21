
const postResolvers = require('./resolvers/posts');
const userResolvers = require('./resolvers/users');

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation
    }
}