FROM node:17-alpine

WORKDIR /var/www

COPY package.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "start"]
