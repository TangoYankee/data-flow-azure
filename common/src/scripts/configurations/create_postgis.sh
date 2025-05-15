#! /bin/sh

psql -d $PG_CONNECTION --file $SCRIPTS_PATH/create_postgis.sql
