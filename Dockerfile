# The image from Docker Hub
FROM node:12-alpine

# Install librdkafka dependecies
RUN apk add --no-cache bash g++ ca-certificates lz4-dev musl-dev cyrus-sasl-dev openssl-dev make python
RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

# Set the working directory
WORKDIR /usr/src/app

# Define and set defaults for environment variables
ENV NODE_ENV=production

# Copy package.json
COPY ["package*.json", "./"]

# Install dependencies and clean up npm's cache
RUN npm ci

# Bundle app sources
COPY ["build", "./build"]

# Make port 8080 available to the world outside this container
EXPOSE 8080

# At the end, set the user to use when running this image
USER node

# Runs when the container launches
CMD ["node", "build/server.js"]