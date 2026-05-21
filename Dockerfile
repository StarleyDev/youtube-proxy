# Use Node.js LTS as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Install TypeScript and build
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npx tsc

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
