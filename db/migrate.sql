CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);


CREATE TABLE IF NOT EXISTS reports (
    filename VARCHAR(255) NOT NULL,
    filetext VARCHAR(255) NOT NULL,
    UNIQUE(filename)
);