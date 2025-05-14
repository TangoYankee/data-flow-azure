DROP TABLE IF EXISTS
	source_borough
	CASCADE;

CREATE TABLE IF NOT EXISTS borough_source_validation (
	borocode char(1) PRIMARY KEY NOT NULL CHECK (borocode SIMILAR TO '[1-9]'),
	boroname text NOT NULL,
	wkt geometry(MULTIPOLYGON, 4326) NOT NULL
);
