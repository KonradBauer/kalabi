#!/bin/sh
set -e

# Ensure media upload directory exists and is writable by nextjs user
# This fixes permissions when host volume is mounted (./uploads:/app/public/media)
chown -R nextjs:nodejs /app/public/media 2>/dev/null || true

# Drop privileges and start the app as nextjs user
exec su-exec nextjs:nodejs sh -c 'HOSTNAME="0.0.0.0" node server.js'
