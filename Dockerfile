FROM node:14.17.5 AS builder-client

WORKDIR /usr/src/client
COPY ./package.json .

RUN yarn

FROM node:14.17.5

WORKDIR /app
COPY . .
COPY --from=builder-client /usr/src/client/node_modules/ /app/node_modules/

EXPOSE 3000
ENV MODE="DOCKER"
ENTRYPOINT ["yarn", "start"]