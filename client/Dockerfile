# --------------------
# Build stage
# --------------------

FROM node:22-alpine AS base

# Install global dependencies
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Install project dependencies
COPY package.json .
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Build the app with more memory
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm run build


# --------------------
# Production stage
# --------------------

FROM caddy:2-alpine

# Set working directory for the server
WORKDIR /srv

# Copy Caddy configuration
COPY --from=base /app/Caddyfile /etc/caddy/Caddyfile

# Copy built frontend files (different with docs)
COPY --from=base /app/dist .

# Expose HTTP port
EXPOSE 80

# Start Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
