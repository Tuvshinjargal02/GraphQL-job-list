import { ApolloServer } from "@apollo/server"
import { expressMiddleware as apolloExpressMiddleware } from "@apollo/server/express4"
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers.js";
import { getUserByEmail } from "./controllers/user.js";


import cors from "cors";
import express from "express";
import colors from "colors";

import { handleLogin, authenticationMiddleware } from "./authentication.js";
import { read } from "node:fs";

const PORT = 9000;
const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
}), express.json(), authenticationMiddleware, (req, res, next) => {
    console.log(" ++++++", req.auth);
    return next();
});
app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf8");
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

app.use(
    "/graphql",
    apolloExpressMiddleware(apolloServer, {
      context: async ({ req }) => {
        if (req.auth) {
          const user = await getUserByEmail(req.auth.email);
          // const company = await getCompanyById(user.companyId);
          return { user };
        }
        return {};
      },
    })
  );


app.listen({ port: PORT}, () => {
    console.log(`Express сервер ажиллаж байна: http://localhost:${PORT}` .inverse);
    console.log(`Apollo GraphQL сервер: http://localhost:${PORT}/graphql` .rainbow);
});