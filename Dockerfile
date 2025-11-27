FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
ENV NODE_ENV production
ARG REACT_APP_PROJECT_NAME
ENV REACT_APP_PROJECT_NAME=$REACT_APP_PROJECT_NAME
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
ARG REACT_APP_HOST_NAME
ENV REACT_APP_HOST_NAME=$REACT_APP_HOST_NAME
COPY public /usr/src/app/public
COPY src /usr/src/app/src
COPY index.html /usr/src/app/index.html
COPY vite.config.js /usr/src/app/vite.config.js
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
