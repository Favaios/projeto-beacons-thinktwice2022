
FROM node:14-alpine

WORKDIR /app

COPY *.json ./
RUN npm ci

COPY ./src ./src

ENTRYPOINT ["npm", "run", "dev"]