#!/bin/sh
set -e

# Ensure upload directories exist and are writable by nextjs user
# This fixes permissions when host volumes are mounted
chown -R nextjs:nodejs /app/public/media 2>/dev/null || true
chown -R nextjs:nodejs /app/public/videos 2>/dev/null || true

# Drop privileges and start the app as nextjs user
exec su-exec nextjs:nodejs sh -c 'HOSTNAME="0.0.0.0" node server.js'
