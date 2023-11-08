drop database if exists smart_to_do_planned;
create database smart_to_do_planned;
use smart_to_do_planned;

drop table if exists task_priority;
drop table if exists task;
drop table if exists location;
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

create table location (
    google_places_id varchar(50) primary key,
	google_places_name varchar(50),
    google_places_lat double,
    google_places_long double
);

create table task (
    task_id int primary key auto_increment,
    app_user_id int,
    task_name varchar(50) not null,
    due_date datetime,
    is_outdoors bit not null default(1),
    google_places_id varchar(50),
    task_details text,
	constraint fk_t_au_app_user_id
		foreign key (app_user_id)
		references app_user (app_user_id)
		on delete cascade,
	constraint fk_t_l_google_places_id
		foreign key (google_places_id)
		references location (google_places_id)
		on delete cascade
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

# Not sure I want to enable this. I need garbage collection on location, but this seems resource greedy.
delimiter //
create trigger delete_location_after_last_task
after delete on task for each row
begin
    declare place_count int;
    select count(*) into place_count from task where google_places_id = old.google_places_id;
    if place_count = 0 then
        delete from location where google_place_id = old.google_places_id;
    end if;
end;
//
delimiter ;

-- Presentation Data

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled, zone_id) values
    ('greg@yourcompany.com', '$2a$10$shGif8A.IeP7DR8x4tE/r.Dtmp5kMcdGJ0O9LpTb3dZypyhyn/Auq', 1, 'America/New_York'),
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1, 'America/Phoenix');

insert into app_user_role values
    (1, 1),
    (2, 1);

insert into location (google_places_id, google_places_name, google_places_lat, google_places_long) values
('ChIJLwPMoJm1RIYRetVp1EtGm10', 'Austin', 30.267153, -97.7430608),
('ChIJOwg_06VPwokRYv534QaPC8g', 'New York', 40.7127753, -74.0059728),
('ChIJfZBMj9xH6IkRUJm6EwPnbIc', 'Lidl', 40.869536, -73.0248237),
('ChIJ1cRWVORYwokREns-iQmSp8k', 'Genesis10 Headquarters', 40.7601939, -73.9679122),
('ChIJ42HBBExAqUYRW6QDdJ-bbMI', 'Dev10', 40.7602213, -73.96810099999999),
('ChIJLY7dwpJO6IkRMUDH3H4It5U', 'Great South Bay', 40.687051, -73.111356);
    
insert into task (app_user_id, task_name, due_date, is_outdoors, google_places_id, task_details) values
(1, 'Thank Esin', '2023-10-30 10:00:00', 0, 'ChIJLwPMoJm1RIYRetVp1EtGm10', 'Because she is awesome'),
(1, 'Sleep In', '2023-10-31 11:00:00', 0, 'ChIJOwg_06VPwokRYv534QaPC8g', null),
(1, 'Do Laundry', null, 0, null, null),
(1, 'Go Grocery Shopping', null , 0, 'ChIJfZBMj9xH6IkRUJm6EwPnbIc', 'Need Eggs, Milk & Ice Cream'),
(1, 'Thank Corbin', null, 0, 'ChIJ1cRWVORYwokREns-iQmSp8k', 'Cause he is cool too'),
(1, 'Get Hired By You', '2023-11-15 08:00:00', 0, null, 'Trust me, I am a good fit'),
(1, 'Thank Brendan', null, 0, 'ChIJ42HBBExAqUYRW6QDdJ-bbMI', 'And he is cool as well'),
(1, 'Go sailing', null, 0, 'ChIJLY7dwpJO6IkRMUDH3H4It5U', null);

insert into task_priority (task_id) values
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8);