FROM hmctspublic.azurecr.io/imported/library/node-alpine-lts-10:10-alpine as base
COPY package.json yarn.lock ./
RUN yarn install --production

FROM base as runtime
COPY . .
USER hmcts
