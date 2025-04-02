import "dotenv/config";

type AppConfig = {
  nodeEnv: string;
  port: number;
  hubspot: HubSpotConfig;
  db: DbConfig;
};

type HubSpotConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

type DbConfig = {
  pghost: string;
  pgport: number;
  pguser: string;
  pgpassword: string;
  pgdatabase: string;
};

const config: AppConfig = {
  nodeEnv: process.env.NODE_ENV as string,
  port: Number(process.env.PORT),
  hubspot: {
    clientId: process.env.HUBSPOT_CLIENT_ID as string,
    clientSecret: process.env.HUBSPOT_CLIENT_SECRET as string,
    redirectUri: process.env.HUBSPOT_REDIRECT_URI as string,
  },
  db: {
    pghost: process.env.PGHOST as string,
    pgport: Number(process.env.PGPORT),
    pguser: process.env.PGUSER as string,
    pgpassword: process.env.PGPASSWORD as string,
    pgdatabase: process.env.PGDATABASE as string,
  },
};

export default config;
