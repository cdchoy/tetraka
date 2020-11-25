FROM node:15.3-alpine3.10

WORKDIR /app

COPY package.json ./
RUN npm install --silent && \
    npm install typescript -g

COPY . ./

# runs the tsconfig
RUN ["tsc", "-p", "."]

EXPOSE 5000

CMD ["node", "index.js"]