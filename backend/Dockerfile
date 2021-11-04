FROM node:latest

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN cp .env.example .env

RUN npm run migrate


