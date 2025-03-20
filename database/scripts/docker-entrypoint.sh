#!/bin/bash

# Connect to database
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER"; do
  echo "Waiting for database..."
  sleep 2
done
echo "Database is ready"

# Run backup
echo "Running database backup..."
./scripts/backup.sh

# Run backup cleanup
echo "Cleaning up old backups..."
./scripts/backup_clear.sh

# Start the cron service for scheduled tasks
echo "Starting cron service..."
crond

# Keep the container running indefinitely (if no other long-running process exists)
tail -f /dev/null
