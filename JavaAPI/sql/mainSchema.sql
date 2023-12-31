drop database if exists smart_to_do;
create database smart_to_do;
use smart_to_do;

drop table if exists task_priority;
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
	google_places_name varchar(50),
    google_places_lat double,
    google_places_long double,
    task_details text
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
    
insert into task (app_user_id, task_name, due_date, is_outdoors, google_places_id, google_places_name, google_places_lat, google_places_long, task_details) values
(1, 'Update Resume', '2023-11-10 17:00:00', 0, null, null, null, null, 'Update with Dev10'),
(1, 'Mow Lawn', '2023-11-15 23:59:00', 1, 'ChIJ4zGFAZpYwokRGUGph3Mf37k', 'Central Park', 40.7825547, -73.9655834, null),
(1, 'Do Laundry', null, 0, null, null, null, null, null),
(1, 'Go Grocery Shopping', null , 0, 'ChIJ1_bNGJ1YwokR9OFA1FuxTJQ', 'Trader Joe\'s', 40.7908176, -73.9693698, 'Need Eggs, Milk & Butter'),
(1, 'Eye Exam', '2023-11-24 13:45:00', 0, 'ChIJvWnc5iZawokRhSZKBnqgUNg', 'Eye Solutions', 40.7149221, -73.9989713, 'Bring old glasses'),
(1, 'Get Hired By You', '2023-11-15 08:00:00', 0, 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw', 'United States', 37.09024, -95.712891, 'Trust me, I am a good fit'),
(1, 'Finish GitHub Pages', '2023-11-10 17:00:00', 0, null, null, null, null, 'Finish SmartTasker project page, profile page can be done later'),
(1, 'Go sailing', '2023-11-18 15:30:00', 1, 'ChIJnc69uVb1wokRfwbk0L8ZrXw', 'Flushing Point Marina', 40.779712, -73.848992, null);

insert into task_priority (task_id) values
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8);