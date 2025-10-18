# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.18.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ARG YARN_VERSION=4.10.3

# Install Yarn 4
RUN corepack enable && \
    yarn set version ${YARN_VERSION}


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# Copy application code
COPY . .

# Build application
RUN yarn run build

# Then run compiled JS only
CMD ["node", "dist/server.js"]



# Final stage for app image
FROM base
WORKDIR /app

# Copy compiled JS, dependencies, and package files
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

# Expose the port your server listens on
EXPOSE 3000

# Run the compiled JS
CMD ["node", "dist/server.js"]