const dotenv = require('dotenv');
dotenv.config();

const { createServer } = require('http');
const { subscribe, execute } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const resolvers = require('./graphQL');
const typeDefs = require('./graphQL/typeDefs');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/graphQl').then(() => {
    console.log('DB connected!!');
}).catch(err => console.log(err));

(async (typeDefs, resolvers) => {
    const app = express();
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const httpServer = createServer(app);
    const pubSub = new PubSub();

    const server = new ApolloServer({ 
        schema,
        context: ({req}) => ({ req, pubSub }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                }
            }
        }],
    });

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        async onConnect() {
            console.log('Connected!');
            return {
                pubSub
            }
        },
        onDisconnect() {
            console.log('Disconnected!');
        }
    }, {
        server: httpServer,
        path: server.graphqlPath
    })

    await server.start();
    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server ready at  http://localhost:${PORT}${server.graphqlPath}`);
})(typeDefs, resolvers);

