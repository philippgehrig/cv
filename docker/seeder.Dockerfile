FROM node:23-alpine

# Install curl for health check
RUN apk --no-cache add curl

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy required directories for the seed script
COPY ./scripts ./scripts
COPY ./composables ./composables

# Install TypeScript and ts-node for compilation and execution
RUN yarn add -D typescript ts-node @types/node

# Copy the TypeScript configuration files
COPY ./tsconfig.json ./
COPY ./tsconfig.seeder.json ./

# Copy the entrypoint script
COPY ./docker/directus-init.sh /

# Make the entrypoint script executable
RUN chmod +x /directus-init.sh

# Set the entrypoint
ENTRYPOINT ["/directus-init.sh"]

# Default command (can be overridden)
CMD ["echo", "Seeding completed"]