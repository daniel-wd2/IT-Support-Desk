#!/bin/sh
set -e

until npx prisma db push --skip-generate; do
  echo "Waiting for database..."
  sleep 2
done

node dist/prisma/seed.js
node dist/src/main.js
