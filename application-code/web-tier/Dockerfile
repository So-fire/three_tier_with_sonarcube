# Use nginx to serve the static site
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app


# Copy files and install dependencies..
COPY package*.json ./
RUN npm install

# Copy rest of the backend code
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


#In the web tier Dockerfile, i used a multi-stage build to first build the React app and then serve it using Nginx.
# copied my nginx.cof file into mydockerfile