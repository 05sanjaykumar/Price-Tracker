# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expose Vite port
EXPOSE 5173

# Run dev server (adjust if you want to do production build)
CMD ["npm", "run", "dev", "--", "--host"]
