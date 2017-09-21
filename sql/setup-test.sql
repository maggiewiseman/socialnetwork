DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    bio VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    status INT NOT NULL
);

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    user_text TEXT NOT NULL,
    image VARCHAR(255),
    link VARCHAR(255),
    link_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, email, password, profile_pic, bio) VALUES ('Maggie', 'Wiseman', 'maggie', 'maggie', 'a pic', 'full-stack developer');

INSERT INTO users (first_name, last_name, email, password, profile_pic, bio) VALUES ('Lizzy', 'Millenaar', 'lizzy', 'lizzy', 'a better pic', 'childrens author');

INSERT INTO users (first_name, last_name, email, password, profile_pic, bio) VALUES ('Charley', 'Wiseman', 'charley', 'charley', 'my dad', 'insurance investigator with the action packed expense account');

INSERT INTO users (first_name, last_name, email, password, profile_pic, bio) VALUES ('Janette', 'Winn', 'nettie', 'nettie', 'my mom', 'yogi, mom, health guru');

INSERT INTO friendships (sender_id, receiver_id, status) VALUES (1, 2, 2);

INSERT INTO friendships (sender_id, receiver_id, status) VALUES (3, 1, 1);

INSERT INTO friendships (sender_id, receiver_id, status) VALUES (2, 3, 3);

INSERT INTO friendships (sender_id, receiver_id, status) VALUES (3, 4, 5);

INSERT INTO chats (user_id, message) VALUES (1, 'I heart pandas!') RETURNING id;
