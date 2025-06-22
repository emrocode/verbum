import { wordSchema as schema } from "../schemas/wordSchema.js";
import { formatSense } from "../utils.js";

export default function wordRoute(fastify) {
  fastify.get("/:word", schema, async (req, reply) => {
    const { word } = req.params;
    const url = `${fastify.config.RAE_ENDPOINT_URL}/words/${word}`;

    try {
      const res = await fetch(url).then((res) => res.json());
      const meaning = res.data.meanings[0];
      const senses = meaning.senses;
      const origin = meaning.origin;

      const LIMIT = 3;
      const limitedSenses = senses.slice(0, LIMIT);
      const formattedSenses = limitedSenses.map((sense) => formatSense(sense));

      if (senses.length > LIMIT)
        formattedSenses.push(`[+${senses.length - LIMIT} definiciones más...]`);

      reply.send({
        ...(origin && { origin: origin.raw }),
        text: formattedSenses.join("\n"),
      });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Error fetching from external source." });
    }
  });
}
