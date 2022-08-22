
const postResolvers = require('./resolvers/posts');
const userResolvers = require('./resolvers/users');
const commentResolvers = require('./resolvers/comments');

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}