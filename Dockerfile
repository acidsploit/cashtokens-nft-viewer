# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8083
CMD ["nginx", "-g", "daemon off;"]

# docker build -t vuejs-cookbook/dockerize-vuejs-app .
# docker run -it -p 8083:80 --rm --name cashtokens-nft-viewer vuejs-cookbook/dockerize-vuejs-app
