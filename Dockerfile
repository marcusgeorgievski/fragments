# Optimizations:
#   - (1) Use the alpine version of the node image to reduce the size of the final image
#   - (2) Use official node image
#   - (3) Use specific alpine image version to ensure the same image is used across all environments
#   - (5) Use multi-stage builds to reduce the size of the final image
#   - (6) Only install production dependencies
#   - (9) Use the HEALTHCHECK command to check if the service is running

# Stage 0: install base dependencies

FROM node:21-alpine3.18@sha256:911976032e5e174fdd8f5fb63d7089b09d59d21dba3df2728c716cbb88c7b821 AS dependencies

LABEL maintainer="Marcus Georgievski <marcusgeorgievski@outlook.com>" \
      description="Fragments node.js microservice"

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

###############################################################

# Stage 1: start the app

FROM node:21-alpine3.18@sha256:911976032e5e174fdd8f5fb63d7089b09d59d21dba3df2728c716cbb88c7b821 AS production

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

RUN apk --no-cache add curl=8.2.0

WORKDIR /app

COPY --from=dependencies /app .

COPY . .
# Copy our HTPASSWD file for basic auth
COPY ./tests/.htpasswd ./tests/.htpasswd

# Start the container by running our server
CMD ["npm", "start"]

# We run our service on port 8080
EXPOSE 8080


HEALTHCHECK --interval=30s \
            --timeout=30s \
            --start-period=10s \
            --retries=2 \
            CMD curl --fail localhost:${PORT} || exit 1
