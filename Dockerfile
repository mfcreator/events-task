FROM node:16.2-alpine as dev

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm ci -D

COPY . .

RUN npm run build

FROM node:16.2-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci -P

COPY . .

COPY --from=dev /var/www/html/dist ./dist

CMD ["node", "dist/main"]