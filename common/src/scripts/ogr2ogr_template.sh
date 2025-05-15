#! /bin/sh

PG_CONNECTION="dbname='$FLOW_DATABASE_NAME' host='data-flow-db' user='$FLOW_DATABASE_USER' password='$FLOW_DATABASE_PASSWORD' port=5432"
ogr2ogr \
    -f 'PostgreSQL' \
    PG:"$PG_CONNECTION" \
    -lco precision=NO \
    -nlt PROMOTE_TO_MULTI \
    -overwrite \
    ~/artifacts/$SOURCE_DATA_FILE
