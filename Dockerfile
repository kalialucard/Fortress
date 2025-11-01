# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Set environment variables for build
ARG GOOGLE_API_KEY
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY

# Build the Next.js application
RUN npm run build

# Stage 2: Production environment
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Install production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables for runtime
ARG GOOGLE_API_KEY
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY
ENV PORT=3000

# Command to run the application
CMD ["npm", "start", "--", "-p", "3000"]
