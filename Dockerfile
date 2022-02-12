FROM node:lts-alpine

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .

EXPOSE 7001

CMD ["yarn", "dev"]
