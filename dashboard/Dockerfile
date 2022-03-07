FROM node:17-alpine 

WORKDIR /app

COPY *.json ./
RUN npm ci

COPY ./src ./src
ENTRYPOINT npm start