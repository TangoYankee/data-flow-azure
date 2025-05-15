#! /bin/sh

psql $PG_CONNECTION --file $SCRIPTS_PATH/populate_model.sql
