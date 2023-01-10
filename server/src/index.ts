require("dotenv").config();
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import "reflect-metadata";
import { createServer } from "http";
import { GreetingResolver } from "./resolvers/greeting";

const app = express();
const PORT = process.env.PORT || 4000;

const main = async () => {
    await createConnection({
        type: "postgres",
        database: "hoba",
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        logging: true,
        synchronize: true,
        entities: [User],
    });

    const httpServer = createServer(app);

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: [UserResolver, PostResolver, GreetingResolver],
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground,
        ],
        context: ({ req, res }) => {
            return {
                req, res
            }
        }
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    await new Promise((resolve) =>
        httpServer.listen({ port: PORT }, resolve as () => void)
    );

    console.log(
        `Server started on port ${PORT}, ApolloServer started on port localhost://${PORT}${apolloServer.graphqlPath}`
    );

    // app.listen(PORT, () => {
    //     console.log(
    //         `Server started on port ${PORT}, ApolloServer started on port localhost://${PORT}${apolloServer.graphqlPath}`
    //     );
    // });
};

main().catch((error) => console.log(`server error ${error}`));
