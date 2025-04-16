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

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.output .output
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json .

# Install only production dependencies (if needed)
# RUN yarn install --production --frozen-lockfile

# Expose port (Nuxt default is 3000)
EXPOSE 3000

# Start the Nuxt server
CMD ["node", ".output/server/index.mjs"]
