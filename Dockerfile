FROM node:14.17.5-slim AS builder-client

WORKDIR /usr/src/client
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn build

FROM nginx:1.23.3

WORKDIR /app
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder-client /usr/src/client/build /usr/share/nginx/html