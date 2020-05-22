# build stage
FROM node:lts-alpine as build
WORKDIR /app

# install vue-cli
RUN yarn global add @vue/cli @vue/cli-service-global

COPY package*.json yarn.lock ./

# install all dependencies
RUN yarn install
COPY app/ .
CMD ["yarn", "serve"]

# production stage
FROM nginx:alpine as production
RUN yarn build
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
