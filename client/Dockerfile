FROM node:22-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build # if allocated swap memory still not enough
# RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
