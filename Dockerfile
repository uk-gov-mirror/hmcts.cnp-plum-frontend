FROM node:10.8.0-alpine

RUN mkdir -p /usr/src

COPY package.json yarn.lock server.js /usr/src/
COPY app /usr/src/app
COPY views /usr/src/views

WORKDIR /usr/src

RUN yarn install \
  && yarn setup \
  && yarn cache clean 

CMD [ "yarn", "start" ]