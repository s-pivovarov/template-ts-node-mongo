FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV PORT $PORT
EXPOSE $PORT

CMD ["node", "/app/dist/index.js"]
