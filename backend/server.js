const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const resolvers = require('./graphQL');
const typeDefs = require('./graphQL/typeDefs');


const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect('mongodb://localhost:27017/graphQl').then(() => {
    console.log('DB connected!!');
    return server.listen({ port: 5012 })
}).then(res => console.log(`Response: ${res.url}`));
