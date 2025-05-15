TRUNCATE
	borough
	CASCADE;

INSERT INTO borough
SELECT
	borocode AS id,
	boroname AS title,
	CASE
		WHEN borocode = '1' THEN 'MN'
		WHEN borocode = '2' THEN 'BX'
		WHEN borocode = '3' THEN 'BK'
		WHEN borocode = '4' THEN 'QN'
		WHEN borocode = '5' THEN 'SI'
	END AS abbr,
	geom AS li_ft
FROM borough_source_validation;

\copy borough TO '/home/artifacts/models/boroughs.csv';
