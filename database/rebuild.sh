docker exec -it db_pg sh

psql -U postgres -d db_db
DROP SCHEMA public CASCADE; CREATE SCHEMA public;
exit

pg_restore -U postgres -h db_pg -d db_db /backups/___
exit

npm run db:migrate
