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
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import { COOKIE_NAME, __prod__ } from "./constants";

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

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

    // MongoDB
    const mongoURL = `mongodb+srv://${process.env.SESSION_DB_USERNAME_DEV}:${process.env.SESSION_DB_PASSWORD_DEV}@hoba.oij8p2c.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");

    // Express Session
    app.set("trust proxy", 1);
    app.use(
        session({
            name: COOKIE_NAME,
            // store: ,
            secret: process.env.SESSION_SECRET_DEV as string,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60, // one hour
				httpOnly: true,
                secure: __prod__,
                sameSite: 'lax'
            },
        })
    );

    const httpServer = createServer(app);

    // Apollo Server
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
                req,
                res,
            };
        },
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
