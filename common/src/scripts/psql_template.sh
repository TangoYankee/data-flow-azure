#! /bin/sh

PGPASSWORD=$FLOW_POSTGRES_PASSWORD \
psql \
    --host='data-flow-azure-postgis-1' \
    --port=5432 \
    -U $FLOW_POSTGRES_USER \
    -d $FLOW_POSTGRES_DB \
    --single-transaction \
    --file $SQL_FILE
