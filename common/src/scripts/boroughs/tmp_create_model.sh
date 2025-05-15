#! /bin/sh

psql $PG_CONNECTION --file $SCRIPTS_PATH/tmp_create_model.sql
