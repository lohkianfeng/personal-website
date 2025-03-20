#!/bin/sh

# Function to perform the backup
perform_backup() {
  echo "Starting database backup at $(date)"
  
  # Run pg_dump and store the backup in the /backups directory
  pg_dump -U "$PGUSER" -h db_pg -F c "$PGDATABASE" > "/backups/db_backup_$(date +"%Y%m%d_%H%M%S").dump"
  
  echo "Backup completed at $(date)"
}

# Perform the first backup immediately
perform_backup

# Check if the cron job already exists, and if not, schedule it
if ! crontab -l 2>/dev/null | grep -q "/bin/sh /app/scripts/backup.sh"; then
  echo "Scheduling nightly backups at 12 AM Malaysia Time"
  (crontab -l 2>/dev/null; echo "0 0 * * * /bin/sh /app/scripts/backup.sh") | crontab -
fi
