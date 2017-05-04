CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price NUMERIC(9,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);
