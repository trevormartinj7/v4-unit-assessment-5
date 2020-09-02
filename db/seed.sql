-- DO NOT CODE ABOVE THE LINE --

create table helo_text_posts ( 
    id serial primary key,
    text_title varchar(45), 
    content text,
    date_created text,
    upvotes text, 
    location varchar(100)
);

create table helo_photo_posts (
    id serial primary key, 
    photo_title varchar(45), 
    img text, 
    date_created date, 
    upvotes integer
);

-- DO NOT CODE ABOVE THE LINE --
------------------------------------------------------------------------------------------------------------------------------
-- CODE HERE --

-- 1
drop table helo_photo_posts;

-- 2
alter table helo_text_posts
rename to helo_posts;

-- 3
alter table helo_posts
rename column text_title
to 'title';

-- 4 
alter table helo_posts 
alter column upvotes
set data type integer;

-- 5
alter table helo_posts
add column img text;

-- 6
alter table helo_posts
drop column location;

-- 7
create table helo_users (
    id serial primary key,
    username varchar not null,
    password varchar not null,
    profile_pic text
);

-- 8
alter table helo_text_posts add column author_id integer references helo_users(id);



-- what helo_posts should look like at the end of all that

-- create table helo_posts (
--     id serial primary key,
--     title varchar(45),
--     content text,
--     img text,
--     author_id integer references helo_users(id),
--     date_created date,
--     upvotes integer
-- );