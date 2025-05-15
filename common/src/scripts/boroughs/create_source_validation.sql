DROP TABLE IF EXISTS
	borough_source_validation
	CASCADE;

CREATE TABLE IF NOT EXISTS borough_source_validation (
	borocode char(1) PRIMARY KEY NOT NULL CHECK (borocode SIMILAR TO '[1-9]'),
	boroname text NOT NULL,
	geom geometry(MULTIPOLYGON, 2263) NOT NULL
);

-- dcp_borough_boundary created when loading data with ogr2ogr
INSERT INTO borough_source_validation
	SELECT
		borocode,
		boroname,
		wkb_geometry AS geom
	FROM
		dcp_borough_boundary;
