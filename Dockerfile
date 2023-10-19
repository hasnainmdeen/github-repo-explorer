FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript ts-node

COPY . .

CMD [ "ts-node", "./src/server.ts" ]  # Replace with the correct path to server.ts
