drop database if exists smart_to_do;
create database smart_to_do;
use smart_to_do;

drop table if exists task;
drop table if exists location;
drop table if exists task_priority;

create table location (
    location_id int primary key auto_increment,
    location_name varchar(50) not null,
    location_address_1 varchar(50) not null,
    location_address_2 varchar(50) not null,
    location_city varchar(20) not null,
    location_state varchar(5) not null,		-- separate out state into a separate table
    location_postal varchar(20) not null
);

create table task (
    task_id int primary key auto_increment,
    task_name varchar(50) not null,
    due_date datetime,
    is_outdoors bit not null default(1),
    location_id int,
    task_details text,
	constraint fk_location_id
		foreign key (location_id)
		references location(location_id)
);

create table task_priority (
    task_priority_id int primary key auto_increment,		-- change this out after testing
    task_id int not null,
    task_priority smallint not null,
	constraint fk_task_id
		foreign key (task_id)
		references task(task_id)
);