FROM node:16.15.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@8.19.1

RUN npm install --silent

COPY . .

CMD ["npm","start"]

EXPOSE 5000
