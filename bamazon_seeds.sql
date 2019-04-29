create database bamazon_db;
use bamazon_db;
create table products (
item_id integer auto_increment,
product_name varchar(100) not null,
department_name varchar(100) not null,
price decimal(10,2) not null,
stock_quantity integer not null,
primary key (item_id));

use bamazon_db;
insert into products (product_name, department_name, price, stock_quantity)
values("recliner", "furniture", 250.00,4);
insert into products (product_name, department_name, price, stock_quantity)
values("fork", "dining", 5.00,12);
insert into products (product_name, department_name, price, stock_quantity)
values("pillow", "bedding", 30.65,8);
insert into products (product_name, department_name, price, stock_quantity)
values("wine glass", "dining", 9.99,18);
insert into products (product_name, department_name, price, stock_quantity)
values("beer mug", "dining", 6.99,37);
insert into products (product_name, department_name, price, stock_quantity)
values("duvet", "bedding", 65.85,4);
insert into products (product_name, department_name, price, stock_quantity)
values("night stand", "furniture", 50.50,3);
insert into products (product_name, department_name, price, stock_quantity)
values("lamp", "furniture", 35.25,6);
insert into products (product_name, department_name, price, stock_quantity)
values("coffee table", "furniture", 165.00,2);
insert into products (product_name, department_name, price, stock_quantity)
values("ottoman", "furniture", 110.00,1);


