FROM hmctspublic.azurecr.io/base/node/alpine-lts-10:10-alpine as base
COPY package.json yarn.lock ./
RUN yarn install --production

FROM base as runtime
COPY . .
USER hmcts
