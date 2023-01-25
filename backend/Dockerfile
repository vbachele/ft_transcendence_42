FROM node:19.4-buster as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

COPY --chown=node:node prisma ./prisma

COPY --chown=node:node ./.env ./.env

RUN npx prisma generate

RUN npm run build


USER node

FROM node:19.0.1-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install --omit=dev

COPY --chown=node:node . .

COPY --chown=node:node --from=development /usr/src/app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/main"]