FROM node:19.0.1-alpine3.15 as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

USER node

FROM node:19.0.1-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --chown=node:node --from=development /usr/src/app/dist ./dist

EXPOSE 5173

CMD ["node", "dist/main"]