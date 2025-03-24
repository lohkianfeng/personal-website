import "dotenv/config";

type AppConfig = {
  nodeEnv: string;
  port: number;
  db: DbConfig;
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
  db: {
    pghost: process.env.PGHOST as string,
    pgport: Number(process.env.PGPORT),
    pguser: process.env.PGUSER as string,
    pgpassword: process.env.PGPASSWORD as string,
    pgdatabase: process.env.PGDATABASE as string,
  },
};

export default config;
