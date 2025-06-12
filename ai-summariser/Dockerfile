# ai-summariser/Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies (like curl, wget, netcat for debugging)
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose Flask port
EXPOSE 5050

# Run the Flask app
CMD ["python", "app.py"]
