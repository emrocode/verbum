"use strict";

import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import routes from "./routes/index.js";
import { envSchema as schema } from "./schemas/envSchema.js";

const app = Fastify({ logger: true });

await app.register(fastifyEnv, {
  dotenv: true,
  schema: schema,
});

app
  .register(fastifyCors, {
    origin: "*",
    methods: ["GET"],
  })
  .register(fastifyHelmet, { global: true })
  .register(routes);

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};

if (!process.env.VERCEL) {
  app.listen(
    { port: process.env.PORT || 3000, host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      console.log(`Server ready at ${address}`);
    },
  );
}
