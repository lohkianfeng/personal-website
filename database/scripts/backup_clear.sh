#!/bin/sh

# Function to clear backups older than 7 days
clear_old_backups() {
  echo "Starting cleanup of old backups at $(date)"
  
  # Find and delete backup files older than 7 days in the /backups directory
  find /backups -type f -name "*.dump" -mtime +7 -exec rm -f {} \;
  
  echo "Old backups cleared at $(date)"
}

# Perform the cleanup
clear_old_backups

# Check if the cron job for cleanup already exists, and if not, schedule it
if ! crontab -l 2>/dev/null | grep -q "/bin/sh /app/scripts/backup_clear.sh"; then
  echo "Scheduling nightly cleanup at 1 AM Malaysia Time"
  (crontab -l 2>/dev/null; echo "0 1 * * * /bin/sh /app/scripts/backup_clear.sh") | crontab -
fi
