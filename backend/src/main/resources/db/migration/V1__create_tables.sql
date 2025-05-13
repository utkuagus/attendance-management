create table person (
	id int not null auto_increment,
	name varchar(255),
	created_at datetime,
	updated_at datetime,
	primary key (id)
);

CREATE TRIGGER person_create BEFORE INSERT ON `person` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER person_update BEFORE UPDATE ON `person` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

create table instructor (
	id int not null auto_increment,
	person_id int not null,
	created_at datetime,
	updated_at datetime,
	primary key (id),
	foreign key (person_id) references person(id)
);

CREATE TRIGGER instructor_create BEFORE INSERT ON `instructor` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER instructor_update BEFORE UPDATE ON `instructor` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

create table student (
	id int not null auto_increment,
	person_id int not null,
	created_at datetime,
	updated_at datetime,
	primary key (id),
	foreign key (person_id) references person(id)
);

CREATE TRIGGER student_create BEFORE INSERT ON `student` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER student_update BEFORE UPDATE ON `student` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;

create table weekday (
	id int not null auto_increment,
	name varchar(50),
	primary key (id)
);

create table course (
	id int not null auto_increment,
	instructor_id int not null,
	code varchar(255) not null,
	day_id int,
	start_time time,
	duration_by_hour int,
	created_at datetime,
	updated_at datetime,
	primary key (id),
	foreign key (instructor_id) references instructor(id),
	foreign key (day_id) references weekday(id)
);

CREATE TRIGGER course_create BEFORE INSERT ON `course` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER course_update BEFORE UPDATE ON `course` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;


create table course_student (
	id int not null auto_increment,
	course_id int not null,
	student_id int not null,
	created_at datetime,
	updated_at datetime,
	primary key (id),
	foreign key (course_id) references course(id),
	foreign key (student_id) references student(id)
);

CREATE TRIGGER course_student_create BEFORE INSERT ON `course_student` FOR EACH ROW SET NEW.created_at = NOW(), NEW.updated_at = NOW();
CREATE TRIGGER course_student_update BEFORE UPDATE ON `course_student` FOR EACH ROW SET NEW.updated_at = NOW(), NEW.created_at = OLD.created_at;