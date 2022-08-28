FROM node:10.16-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm i --silent

COPY . .

EXPOSE 3000

CMD ['npm', 'start']