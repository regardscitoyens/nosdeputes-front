# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# If you're using Next.js 12 or newer, you need to install sharp for image optimization
# RUN npm install sharp

# Set the default port to 8080
ENV PORT 8080

# Allow the port to be customizable through an environment variable
ARG CC_DOCKER_EXPOSED_HTTP_PORT
ENV PORT ${CC_DOCKER_EXPOSED_HTTP_PORT:-8080}

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE ${PORT}

# Set the default command to run when starting the container
CMD ["npm", "start"]
