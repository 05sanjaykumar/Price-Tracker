#!/bin/sh

# Start the server in the background
ollama serve &

# Give it time to initialize
sleep 3

# Pull the model (e.g., llama3)
ollama pull llama3

# Optional: keep container running
tail -f /dev/null