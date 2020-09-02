insert into helo_users (username, password, profile_pic) 
values (${username}, ${hash}, ${profile})
returning *;