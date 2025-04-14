# --------------------
# Build and Run stage
# --------------------

FROM node:22-alpine

# Install global dependencies
RUN apk add --no-cache bash postgresql-client
RUN npm install -g pnpm tsx

# Set working directory
WORKDIR /app

# Install project dependencies
COPY package.json .
RUN pnpm install

# Copy the rest of the source code
COPY . .

# Build the app
RUN pnpm run build

# Expose HTTP port
EXPOSE 5000

# Run the entrypoint script
RUN chmod +x ./docker-entrypoint.sh
CMD ["sh", "./docker-entrypoint.sh"]
