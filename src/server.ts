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
import * as release from "./models/release";
import * as artist from "./models/artist";
import * as channel from "./models/channel";
import * as message from "./models/message";
import { authController } from "./controllers/authController";
import { fileController } from "./controllers/fileController";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

export const prisma = new PrismaClient();

const main = async () => {
  const schema = makeSchema({
    types: [user, review, release, artist, message, channel],
    outputs: {
      typegen: join(__dirname, "../generated/nexus-typegen.ts"),
      schema: join(__dirname, "../generated/schema.graphql"),
    },
  });

  const app = express();
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: [
        "http://localhost:80",
        "http://localhost:19006",
        "exp://192.168.0.120:19000",
      ],
      credentials: true,
    })
  );

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "http:localhost:80",
        "exp://192.168.0.120:19000",
        "https://studio.apollographql.com",
        "http://localhost:19006",
      ],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.use("/auth", authController);
  app.use("/file", fileController);

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 80 });
    resolve();
  });
};

main();
