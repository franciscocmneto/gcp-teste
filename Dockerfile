FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./
COPY .env ./

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]
