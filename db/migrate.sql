CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    birth VARCHAR(60) NOT NULL,
    UNIQUE(email)
);


CREATE TABLE IF NOT EXISTS reports (
    filename VARCHAR(255) NOT NULL,
    filetext VARCHAR(255) NOT NULL,
    UNIQUE(filename)
);