import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import subteAPI from "./data/index.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const typeDefs = `#graphql

    type Subte {
        id: ID!
        linea: String!
        tripId: String!
        startTime: String!
        estaciones: String!
    }

    type Query {
        subtes: [Subte]!
        findSubte(linea: String!): Subte
    }
`;

const resolvers = {
  Query: {
    subtes: async () => {
      try {
        const data = await subteAPI();
        return data;
      } catch (error) {
        console.error("Error fetching subtes:", error);
        return [];
      }
    },
    findSubte: async (_, { linea }) => {
      try {
        const data = await subteAPI();
        return data.find((subte) => subte.linea === linea);
      } catch (error) {
        console.error("Error fetching subte:", error);
      }
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
