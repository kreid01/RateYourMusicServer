import { makeSchema } from "nexus";
import { join } from "path";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import express from "express";
import cors from "cors";
import http from "http";
import { PrismaClient } from "@prisma/client";
import * as review from "./models/review";
import * as user from "./models/user";
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";

export const prisma = new PrismaClient();

const main = async () => {
  const schema = makeSchema({
    types: [user, review],
    outputs: {
      typegen: join(__dirname, "../generated/nexus-typegen.ts"),
      schema: join(__dirname, "../generated/schema.graphql"),
    },
  });

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:80",
      credentials: true,
    })
  );

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http:localhost:3000", "https://studio.apollographql.com"],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 80 });
    resolve();
  });
};

main();
