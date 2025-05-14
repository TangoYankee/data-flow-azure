#! /bin/sh

PG_CONNECTION="dbname='$FLOW_POSTGRES_DB' host='data-flow-azure-postgis-1' user='$FLOW_POSTGRES_USER' password='$FLOW_POSTGRES_PASSWORD' port=5432"
ogr2ogr \
    -f 'PostgreSQL' \
    PG:"$PG_CONNECTION" \
    -lco precision=NO \
    ~/artifacts/$SOURCE_DATA_FILE
