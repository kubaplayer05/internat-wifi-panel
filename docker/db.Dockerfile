FROM mariadb:latest

COPY db/schema.sql /docker-entrypoint-initdb.d/schema.sql