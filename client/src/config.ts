import { z } from "zod";

const schema = z.object({
  nodeEnv: z.string(),
  backend: z.object({
    url: z.string().url(),
  }),
  hubspot: z.object({
    clientId: z.string(),
    redirectUri: z.string().url(),
  }),
});

const config = schema.parse({
  nodeEnv: import.meta.env.VITE_NODE_ENV,
  backend: {
    url: import.meta.env.VITE_BACKEND_URL,
  },
  hubspot: {
    clientId: import.meta.env.VITE_HUBSPOT_CLIENT_ID,
    redirectUri: import.meta.env.VITE_HUBSPOT_REDIRECT_URI,
  },
});

export default config;
