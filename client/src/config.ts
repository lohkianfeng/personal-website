type AppConfig = {
  nodeEnv: string;
  backend: BackendConfig;
  hubspot: HubSpotConfig;
};

type BackendConfig = {
  url: string;
};

type HubSpotConfig = {
  clientId: string;
  redirectUri: string;
};

const config: AppConfig = {
  nodeEnv: import.meta.env.VITE_NODE_ENV as string,
  backend: {
    url: import.meta.env.VITE_BACKEND_URL as string,
  },
  hubspot: {
    clientId: import.meta.env.VITE_HUBSPOT_CLIENT_ID as string,
    redirectUri: import.meta.env.VITE_HUBSPOT_REDIRECT_URI as string,
  },
};

export default config;
