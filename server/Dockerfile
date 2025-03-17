FROM node:22-alpine

RUN apk add --no-cache bash

RUN npm install -g nodemon pnpm tsx

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN npm run build

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 5000

CMD ["sh", "./docker-entrypoint.sh"]
