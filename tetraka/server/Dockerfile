FROM node:14.5.0
# Env
ENV TIME_ZONE=America/Chicago
ENV ENV_NAME dev
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev

# Set the timezone in docker
#RUN apk --update add tzdata \\
#   && cp /usr/share/zoneinfo/America/Chicago /etc/localtime \\
#   && echo "America/Chicago" > /etc/timezone \\
#   && apk del tzdata

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install -g

# Copy all other source code to work directory
ADD . /usr/src/app

# TypeScript
RUN npm run tsc

# Start
CMD [ "npm", "start" ]
EXPOSE 5000