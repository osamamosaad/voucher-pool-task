FROM node:18

WORKDIR /app

COPY app/tsconfig.json ./
COPY app/package*.json ./


RUN npm install

COPY app/ .

RUN npm run build

RUN npm run migration:run

EXPOSE 3000

CMD ["npm", "run", "start:prod"]