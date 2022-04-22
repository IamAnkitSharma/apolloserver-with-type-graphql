import { ApolloServer } from "apollo-server-express";
import express from 'express';
import mongoose from "mongoose";
import 'reflect-metadata';
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/graphql', (req, res) => { 
    res.send('Hello World');
});

async function startServer () {
    const apolloServer = new ApolloServer({
        context: ({ req }) => ({ req }),
        schema: await buildSchema({
            resolvers: [AuthResolver]
        }),
        formatError(error) {
            console.log(JSON.stringify(error, null, 2));
            return error;
        },
        debug: process.env.NODE_ENV !== 'production'
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    mongoose.connect(process.env.MONGO_URL as string);
    console.log('MongoDB Connected!!')
    app.listen({ port: 4000 }, () => console.log(`🚀  Server ready at http://localhost:4000${apolloServer.graphqlPath}`));
}
startServer()