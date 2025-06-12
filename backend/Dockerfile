# backend/Dockerfile
FROM node:22-bullseye

# Install system dependencies needed for Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends \
 && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only package files for layer caching
COPY package*.json ./

# Set Puppeteer env to install correct Chromium
ENV PUPPETEER_PRODUCT=chrome \
    PUPPETEER_SKIP_DOWNLOAD=false \
    IS_DOCKER=true

# Install deps + Chromium
RUN npm install && \
    npx puppeteer browsers install chrome

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "Server.js"]
