DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

CREATE TABLE department(
    id INT primary key auto_increment,
    name VARCHAR(30) not null unique
    );

CREATE TABLE role(
    id INT primary key auto_increment,
    title VARCHAR(30) not null unique,
    salary DECIMAL not null,
    department_id INT not null,
    foreign key (department_id) references department(id)
    );

CREATE TABLE employee(
    id INT primary key auto_increment,
    first_name VARCHAR(20) not null,
    last_name VARCHAR(20) not null,
    role_id INT not null,
    foreign key (role_id) references role(id),
    manager_id INT,
    foreign key (manager_id) references employee(id)
    );



