#!/bin/bash
# Initial SSL certificate setup for kalabimeble.pl
# Run this ONCE on the VPS before starting docker-compose
#
# Usage: ./init-ssl.sh [email]
# Example: ./init-ssl.sh admin@kalabimeble.pl

set -e

DOMAIN="kalabimeble.pl"
EMAIL="${1:-admin@kalabimeble.pl}"

echo "=== SSL Init for $DOMAIN ==="

# Create required directories
mkdir -p certbot/conf certbot/www

# Step 1: Create temporary self-signed cert so nginx can start
echo ">>> Creating temporary self-signed certificate..."
mkdir -p certbot/conf/live/$DOMAIN
openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
  -keyout certbot/conf/live/$DOMAIN/privkey.pem \
  -out certbot/conf/live/$DOMAIN/fullchain.pem \
  -subj "/CN=$DOMAIN"

# Step 2: Start nginx (with self-signed cert)
echo ">>> Starting nginx..."
docker compose up -d nginx

# Step 3: Request real certificate from Let's Encrypt
echo ">>> Requesting Let's Encrypt certificate..."
docker compose run --rm --entrypoint "" certbot \
  certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# Step 4: Reload nginx with real certificate
echo ">>> Reloading nginx..."
docker compose exec nginx nginx -s reload

echo "=== Done! SSL certificate installed for $DOMAIN ==="
echo "Now run: docker compose up -d"
