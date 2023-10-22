drop database if exists smart_to_do;
create database smart_to_do;
use smart_to_do;

drop table if exists task_priority;
drop table if exists location;
drop table if exists task;
drop table if exists app_user_role;
drop table if exists app_role;
drop table if exists app_user;
drop table if exists us_time_zones;

create table us_time_zones (
	timezone_abbr varchar(5) not null primary key,
	gmt_offset int not null,
	is_dst bit not null
);

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table app_user_tz (
	app_user_id int,
	us_time_zones varchar(5),
    constraint pk_app_user_tz
        primary key (app_user_id, us_time_zones),
    constraint fk_app_user_id_bridge
        foreign key (app_user_id)
        references app_user(app_user_id),
	constraint fk_app_user_tz_bridge
        foreign key (us_time_zones)
        references us_time_zones(timezone_abbr)
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
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

create table location (
    location_id int primary key auto_increment,
    location_name varchar(50) not null,
    location_address_1 varchar(50) not null,
    location_address_2 varchar(50),
    location_city varchar(20) not null,
    location_state varchar(5) not null,		-- separate out state into a separate table
    location_postal varchar(20) not null
);

create table task (
    task_id int primary key auto_increment,
    app_user_id int,
    task_name varchar(20) not null,
    due_date datetime,
    is_outdoors bit not null default(1),
    location_id int,
    google_places_id varchar(50),			-- maybe replace entire location table with this
    task_details text,
	constraint fk_location_id
		foreign key (location_id)
		references location(location_id),
	constraint fk_app_user_id
		foreign key (app_user_id)
		references app_user(app_user_id)
);

create table task_priority (
    task_priority_id int primary key auto_increment,		-- change this out after testing
    task_id int not null,
    task_priority smallint not null,
	constraint fk_task_id
		foreign key (task_id)
		references task(task_id)
);

insert into us_time_zones (timezone_abbr, gmt_offset, is_dst)
	values
	('ET', -4, 1),
	('CT', -5, 1),
	('MT', -6, 1),
	('PT', -7, 1);

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- DELETE EVERYTHING BELOW HERE BEFORE DEPLOYMENT

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 2),
    (2, 1);