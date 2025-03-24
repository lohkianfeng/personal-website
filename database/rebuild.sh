docker exec -it hub_pg sh

psql -U postgres -d hub_db
DROP SCHEMA public CASCADE; CREATE SCHEMA public;
exit

pg_restore -U postgres -h hub_pg -d hub_db /backups/___
exit

npm run db:migrate
