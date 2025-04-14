import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  nodeEnv: z.string(),
  port: z.coerce.number(),
  hubspot: z.object({
    public: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
      redirectUri: z.string().url(),
    }),
    private: z.object({
      accessToken: z.string(),
    }),
  }),
  db: z.object({
    pghost: z.string(),
    pgport: z.coerce.number(),
    pguser: z.string(),
    pgpassword: z.string(),
    pgdatabase: z.string(),
  }),
});

const config = schema.parse({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  hubspot: {
    public: {
      clientId: process.env.HUBSPOT_CLIENT_ID,
      clientSecret: process.env.HUBSPOT_CLIENT_SECRET,
      redirectUri: process.env.HUBSPOT_REDIRECT_URI,
    },
    private: {
      accessToken: process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN,
    },
  },
  db: {
    pghost: process.env.PGHOST,
    pgport: process.env.PGPORT,
    pguser: process.env.PGUSER,
    pgpassword: process.env.PGPASSWORD,
    pgdatabase: process.env.PGDATABASE,
  },
});

export default config;
