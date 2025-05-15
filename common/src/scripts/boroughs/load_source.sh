#! /bin/sh

ogr2ogr \
    -f 'PostgreSQL' \
    PG:"$PG_CONNECTION" \
    -lco precision=NO \
    -nlt PROMOTE_TO_MULTI \
    -overwrite \
    $HOME/artifacts/sources/dcp_borough_boundary.shp.zip
