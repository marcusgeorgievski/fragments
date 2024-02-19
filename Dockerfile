# Dockerfile for the fragments microservice 

# Use Node's latest LTS version: 20.11.1
FROM node:20.11.1

LABEL maintainer="Marcus Georgievski <marcusgeorgievski@outloot.com>" \
      description="Fragments node.js microservice"

# Define environment variables
# Port:
#   We default to use port 8080 in our service
# NPM_CONFIG_LOGLEVEL:
#   Reduce npm spam when installing within Docker
#   https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
# NPM_CONFIG_COLOR:
#   Disable colour when run inside Docker
#   https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV PORT=8080 \
    NPM_CONFIG_LOGLEVEL=warn \
    NPM_CONFIG_COLOR=false

# Use /app as our working directory
WORKDIR /app

# Copy the package.json and package-lock.json files into the working dir (/app).
COPY package*.json ./

# Install node dependencies defined in package-lock.json
RUN npm install

# Copy src to /app/src/
COPY ./src ./src

# Copy our HTPASSWD file for basic auth
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD npm start

# We run our service on port 8080
EXPOSE 8080
