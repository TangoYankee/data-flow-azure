#! /bin/sh

PGPASSWORD=$FLOW_DATABASE_PASSWORD \
psql \
    --host='data-flow-db' \
    --port=5432 \
    -U $FLOW_DATABASE_USER \
    -d $FLOW_DATABASE_NAME \
    --single-transaction \
    --file $SQL_FILE
