create table if not exists application
(
    id               int primary key auto_increment,
    first_name       varchar(255) not null,
    last_name        varchar(255) not null,
    email            varchar(255) not null,
    room_number      int          not null,
    physical_address varchar(255) not null,
    password         varchar(255) not null unique,
    login            varchar(255) not null,
    created_at       timestamp                                default current_timestamp,
    status           enum ('approved', 'pending', 'rejected') default 'pending'
);