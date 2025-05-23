#!/bin/bash

# Connect to database
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER"; do
  echo "Waiting for database..."
  sleep 2
done
echo "Database is ready"

# Run migrations
echo "Running migrations..."
pnpm run db:migrate

# Update tables
tsx ./src/drizzle/seed.ts

# Start the application
echo "Starting the application..."
pnpm run start
