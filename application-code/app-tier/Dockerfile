# Base image for Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Add wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose backend port
EXPOSE 4000

# Remove default entrypoint from base image
ENTRYPOINT []

# Wait for DB, then run server
CMD ["/wait-for-it.sh", "db", "3306", "--", "npm", "start"]


# # Base image for Node.js
# FROM node:18-alpine

# # Set working directory
# WORKDIR /app

# # Copy only package files and install dependencies first (leveraging Docker layer caching)
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the backend code
# COPY . .

# # Optional: build step if your app needs it (e.g., TypeScript or React)
# #RUN npm run build

# # Expose backend port
# EXPOSE 4000

# ENTRYPOINT []


# # Add wait-for-it script
# COPY wait-for-it.sh /wait-for-it.sh
# RUN chmod +x /wait-for-it.sh

# # Run the server after waiting for the database to be ready
# CMD ["/wait-for-it.sh", "db", "3306", "--", "npm", "start"]


