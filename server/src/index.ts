require("dotenv").config();
import express from "express";
// import { ApolloServer } from "apollo-server-express";

const app = express();

const main = async () => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

main().catch((error) => console.log(`server error ${error}`));
