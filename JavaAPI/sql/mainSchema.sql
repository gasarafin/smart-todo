drop database if exists smart_to_do;
create database smart_to_do;
use smart_to_do;

drop table if exists task_priority;
drop table if exists location;
drop table if exists task;
drop table if exists app_user_role;
drop table if exists app_role;
drop table if exists app_user;

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1),
    zone_id varchar(50)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user (app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role (app_role_id)
);

create table task (
    task_id int primary key auto_increment,
    app_user_id int,
    task_name varchar(50) not null,
    due_date datetime,
    is_outdoors bit not null default(1),
    google_places_id varchar(50),
    task_details text,
	constraint fk_app_user_id
		foreign key (app_user_id)
		references app_user (app_user_id)
);

create table location (
    google_places_id varchar(50),
    google_places_addr varchar(100),
    location_lat float,
    location_long float,
	constraint pk_google_places_id
		primary key (google_places_id)
);

create table task_priority (
    task_id int,
    task_priority smallint,
    constraint pk_task_priority_id
        primary key (task_id),
	constraint fk_task_id
		foreign key (task_id)
		references task (task_id)
		on delete cascade
);


    
insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled, zone_id)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1, 'America/New_York'),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1, 'America/Phoenix');

insert into app_user_role
    values
    (1, 1),
    (2, 1);
    
insert into location (google_places_id) values ('123ergy');
    
insert into task (app_user_id, task_name, due_date, is_outdoors, google_places_id, task_details) values
(1, 'Task 1', NULL, 0, NULL, NULL),
(1, 'Task 2', NULL, 0, NULL, NULL),
(1, 'Task 3', NULL, 0, NULL, NULL),
(1, 'Task 4', NULL, 0, NULL, NULL),
(2, 'Task 5', NULL, 0, NULL, NULL),
(2, 'Task 6', NULL, 0, NULL, NULL),
(1, 'Task 7', '2020-10-10 12:00:00', 0, '123ergy', 'notes and more notes'),
(2, 'Task 8', NULL, 0, NULL, 'some notes');
    
    