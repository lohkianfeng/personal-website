import "dotenv/config";

const nodeEnv = process.env.NODE_ENV as string;

type AppConfig = {
  nodeEnv: string;
  port: number;
};

const config: AppConfig = {
  nodeEnv: nodeEnv,
  port: Number(process.env.PORT),
};

export default config;
