export const wordSchema = {
  schema: {
    params: {
      type: "object",
      properties: {
        word: {
          type: "string",
          minLength: 1,
          description: "La palabra a buscar",
        },
      },
      required: ["word"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          origin: {
            type: "string",
            description: "Origen y etimología de la palabra",
          },
          text: {
            type: "string",
            description: "Definiciones y acepciones de la palabra",
          },
        },
        required: ["text"],
      },
    },
  },
};
