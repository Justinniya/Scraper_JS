#!/bin/bash

# Start Docker Compose services
echo "[+] Starting Docker Compose services..."
docker compose up --build -d

# Optional: wait a few seconds to ensure services are up
echo "[+] Waiting for services to initialize..."
sleep 10

# Start the autossh tunnel
echo "[+] Starting SSH tunnel with autossh..."
autossh -M 0 -NTC \
  -o ServerAliveInterval=60 \
  -o ServerAliveCountMax=3 \
  -o ExitOnForwardFailure=yes \
  -o StrictHostKeyChecking=no \
  -o UserKnownHostsFile=/dev/null \
  -R 3001:127.0.0.1:3000 \
  root@dev.d3.net