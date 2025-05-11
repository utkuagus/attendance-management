ALTER TABLE course
DROP COLUMN duration_by_hour;

ALTER TABLE course
ADD COLUMN end_time time AFTER start_time;