DROP TABLE IF EXISTS
    borough
    CASCADE;

CREATE TABLE IF NOT EXISTS borough (
    id char(1) PRIMARY KEY NOT NULL CHECK (id SIMILAR TO '[1-9]'),
    title text NOT NULL,
    abbr char(2) NOT NULL,
    li_ft geometry(MULTIPOLYGON, 2263) NOT NULL
);
