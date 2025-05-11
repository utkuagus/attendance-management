alter table person
ADD COLUMN `username` VARCHAR(50) NOT NULL AFTER `name`,
ADD COLUMN `password` VARCHAR(50) NOT NULL AFTER `username`