export const envSchema = {
  type: "object",
  required: ["RAE_ENDPOINT_URL"],
  properties: {
    RAE_ENDPOINT_URL: { type: "string" },
  },
};
