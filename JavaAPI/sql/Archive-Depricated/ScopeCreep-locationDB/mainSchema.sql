drop database if exists smart_to_do;
create database smart_to_do;
use smart_to_do;

drop table if exists task_priority;
drop table if exists location;
drop table if exists task;
drop table if exists app_user_role;
drop table if exists app_role;
drop table if exists app_user;
drop table if exists us_time_zones;  -- delete
drop table if exists app_user_tz;  -- delete
drop table if exists time_zone_info;
drop table if exists dst_info;

create table dst_info (
	dst_id int primary key auto_increment,
    dst_descriptor varchar(50),
    dst_start_month int,
    dst_start_day_week_offset int,
    dst_start_day_of_week varchar(20),
    dst_start_time time,
    dst_end_month int,
	dst_end_day_week_offset int,
    dst_end_day_of_week varchar(20),
    dst_end_time time
);

create table time_zone_info (
	zone_id varchar(50) not null primary key,
	gmt_offset int not null,
	is_dst bit not null,
    dst_timing int,
	constraint fk_dst_info
        foreign key (dst_timing)
        references dst_info(dst_id)
);

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1),
    zone_id varchar(50),
	constraint fk_app_user_tz
        foreign key (zone_id)
        references time_zone_info(zone_id)
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

create table location_supplemental (
    location_id int primary key auto_increment,
    day_1_open time,
    day_1_close time,
    day_2_open time,
    day_2_close time,
	day_3_open time,
    day_3_close time,
	day_4_open time,
    day_4_close time,
	day_5_open time,
    day_5_close time,
	day_6_open time,
    day_6_close time,
	day_7_open time,
    day_7_close time
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

insert into dst_info (dst_descriptor, dst_start_month, dst_start_day_week_offset, dst_start_day_of_week, dst_start_time, dst_end_month, dst_end_day_week_offset, dst_end_day_of_week, dst_end_time)
    values
    ('Standard USA DST', 3, 2, 'Sunday', '02:00:00', 11, 1, 'Sunday', '02:00:00');

insert into time_zone_info (zone_id, gmt_offset, is_dst, dst_timing)
	values
	('America/New_York', -4, 1, 1),
	('America/Chicago', -5, 1, 1),
	('America/Denver', -6, 1, 1),
    ('America/Phoenix', -7, 0, null),
	('America/Los_Angeles', -7, 1, 1);
    
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
    (1, 2),
    (2, 1);