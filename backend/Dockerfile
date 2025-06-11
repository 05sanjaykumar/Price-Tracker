# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose Express port
EXPOSE 3000

# Run the backend server
CMD ["node", "server.js"]
