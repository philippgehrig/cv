# Stage 1: Build the application
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Build the Nuxt app
RUN yarn build

# Stage 2: Production image
FROM node:23-alpine AS production

# Set environment variables
ENV NODE_ENV=production

# Add labels for better organization
LABEL org.opencontainers.image.source="https://github.com/philippgehrig/cv"
LABEL org.opencontainers.image.description="Personal CV"
LABEL maintainer="Philipp Gehrig"

# Set working directory
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
