#! /bin/sh

psql $PG_CONNECTION --file $SCRIPTS_PATH/validate_source.sql
