# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Declare build-time arguments for database configuration
ARG DB_HOST
ARG DB_PORT
ARG DB_DATABASE
ARG DB_USER
ARG DB_PASSWORD

# Set the environment variables from build arguments
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_DATABASE=${DB_DATABASE}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}

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
