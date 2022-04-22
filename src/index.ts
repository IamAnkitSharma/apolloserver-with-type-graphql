import { ApolloServer } from "apollo-server-express";
import express from 'express';
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/auth";
import dotenv from 'dotenv';
dotenv.config();

async function startServer () {
    const app = express();
    const apolloServer = new ApolloServer({
        context: ({ req }) => ({ req }),
        schema: await buildSchema({
            resolvers: [AuthResolver]
        }),
        formatError(error) {
            return new Error(error.message);
        },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    mongoose.connect(process.env.MONGO_URL as string);
    console.log('MongoDB Connected!!')
    app.listen({ port: 4000 }, () => console.log(`🚀  Server ready at http://localhost:4000${apolloServer.graphqlPath}`));
}
startServer()