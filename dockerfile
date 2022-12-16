FROM node as build
WORKDIR /usr/app
COPY package*.json ./
COPY ./prisma/ ./prisma
RUN npm install --force
COPY . .

RUN npm run build

FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production --force

COPY --from=build /usr/app/dist ./dist
COPY ./wait-for-it.sh .env mysite.templates ./dist/
COPY ./prisma/ ./dist/prisma
RUN chmod +x ./dist/wait-for-it.sh .

WORKDIR ./dist

RUN npx prisma generate

EXPOSE 80

CMD node server.js