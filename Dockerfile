# Use Node.js LTS as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for TypeScript compilation)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npx tsc

# Install production dependencies only for final image
RUN npm ci --only=production

# Expose port 2536
EXPOSE 2536

# Start the application with the compiled JavaScript from dist directory
CMD ["node", "dist/index.js"]
