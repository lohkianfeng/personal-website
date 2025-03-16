type AppConfig = {
  nodeEnv: string;
  backend: BackendConfig;
};

type BackendConfig = {
  url: string;
};

const nodeEnv = import.meta.env.VITE_NODE_ENV as string;

const BACKEND_CONFIG: Record<string, BackendConfig> = {
  development: {
    url: import.meta.env.VITE_DEV_BACKEND_URL as string,
  },
  staging: {
    url: import.meta.env.VITE_STAG_BACKEND_URL as string,
  },
  production: {
    url: import.meta.env.VITE_PROD_BACKEND_URL as string,
  },
};

const config: AppConfig = {
  nodeEnv: nodeEnv,
  backend: BACKEND_CONFIG[nodeEnv],
};

export default config;
