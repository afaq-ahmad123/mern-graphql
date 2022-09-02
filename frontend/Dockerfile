FROM node:16.15.0

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

Run npm install -g npm@8.19.1
# COPY package-lock.json .
RUN npm install --silent

COPY . ./
CMD ["npm", "start"]

EXPOSE 3000