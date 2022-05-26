CREATE DATABASE bug_as_a_service;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  cpf VARCHAR(11) UNIQUE,
  cellphone VARCHAR(14)
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  cellphone VARCHAR(14) NOT NULL,
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
  value INTEGER NOT NULL,
  due_date DATE NOT NULL,
  status situation DEFAULT 'Em aberto'
);


