#!/bin/bash

#Login airbnb
echo "[+] Starting Airbnb Login SSH tunnel with autossh..."
autossh -M 0 -NTC \
  -o ServerAliveInterval=60 \
  -o ServerAliveCountMax=3 \
  -o ExitOnForwardFailure=yes \
  -o StrictHostKeyChecking=no \
  -o UserKnownHostsFile=/dev/null \
  -R 4001:127.0.0.1:4000 \
  root@dev.d3.net