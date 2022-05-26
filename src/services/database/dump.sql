CREATE DATABASE bug_as_a_service;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT,
  cpf VARCHAR(11) UNIQUE,
  cellphone VARCHAR(14)
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  cpf VARCHAR(11) UNIQUE,
  email VARCHAR(100) UNIQUE,
  cellphone VARCHAR(14),
  address VARCHAR(100),
  complement VARCHAR(100),
  postal_code VARCHAR(8),
  district VARCHAR(50),
  city VARCHAR(30),
  state CHAR(2)
);

/* CREATE TYPE situation AS ENUM ('Pago', 'Em aberto'); */

CREATE TABLE bills (
  id UUID PRIMARY KEY,
  client_id INT REFERENCES clients (id),
  value INTEGER,
  due_date DATE,
  status situation DEFAULT 'Em aberto'
);


