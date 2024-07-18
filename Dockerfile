# Use an official Node runtime as a parent image
FROM node:14-alpine

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies without running scripts
RUN npm install --ignore-scripts

# Copy only the necessary application files to the working directory
COPY src/ ./src/
COPY public/ ./public/
COPY .env ./
COPY index.js ./
COPY README.md ./

# Change ownership of the application files to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

# Expose the port your app runs on
EXPOSE 5000

# Command to run your application
CMD ["node", "src/index.js"]
