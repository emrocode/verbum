import indexRoute from "./indexRoute.js";
import wordRoute from "./wordRoute.js";

export default function routes(fastify) {
  fastify.register(indexRoute);
  fastify.register(wordRoute, { prefix: "/w/" });
}
