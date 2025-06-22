export default function indexRoute(fastify) {
  fastify.get("/", async (_, reply) => {
    const url = `${fastify.config.RAE_ENDPOINT_URL}/random`;

    try {
      const res = await fetch(url).then((res) => res.json());
      reply.send({ ok: res.ok });
    } catch (error) {
      console.error(error);
    }
  });
}
