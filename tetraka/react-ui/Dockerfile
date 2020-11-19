# pull official base image
FROM node:14.9.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent


# add app
COPY . ./

EXPOSE 5000

RUN ["yarn", "build"]

# start app
CMD ["yarn", "start"]