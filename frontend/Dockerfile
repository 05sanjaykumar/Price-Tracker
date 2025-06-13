# frontend/Dockerfile
FROM node:22-alpine

WORKDIR /app

ENV IS_DOCKER=true

COPY .env . 

COPY package*.json ./
RUN npm install

COPY . .

# Expose Vite port
EXPOSE 5173

# Run dev server (adjust if you want to do production build)
CMD ["npm", "run", "dev", "--", "--host"]
