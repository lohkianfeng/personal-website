type AppConfig = {
  nodeEnv: string;
  backend: BackendConfig;
};

type BackendConfig = {
  url: string;
};

const config: AppConfig = {
  nodeEnv: import.meta.env.VITE_NODE_ENV as string,
  backend: {
    url: import.meta.env.VITE_BACKEND_URL as string,
  },
};

export default config;
