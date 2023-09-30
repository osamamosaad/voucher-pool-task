FROM node:18

WORKDIR /app

COPY app/tsconfig.json ./
COPY app/package*.json ./

COPY app/ .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]