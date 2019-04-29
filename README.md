# inventoryOrderJawn_Bamazon
  
This is a product sales and inventory order management platform of to demonstrate the interoperabiltiy between SQL and node.JS
  
There are two (2) functional apps for this repository, *bamazonCustomer.js* and *bamazonManager.js*
  
A database, # bamazon_db # was set-up, and is executable with the *bamazon_seeds.sql file* 

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [node.js](https://nodejs.org/en/) 
* [MySqlWorkbench](https://dev.mysql.com/downloads/workbench/) - database
* [cli-table](https://www.npmjs.com/package/cli-table) - table to view data in the terminal; an npm library in the package-lock.json file
* [inquirer](https://www.npmjs.com/package/inquirer#prompt) - inquirer for user prompts and responses on input; an npm library in the package-lock.json file
* [mysql](https://www.npmjs.com/package/mysql) - mysql for SQL queries built dynamically on the connection object; an npm library in the package-lock.json file

The following screenshots walk the user through how each app operates:
  
#### (1) bamazonCustomer.js #####

On file-execution in the terminal, the user is prompted with the Sales menu and prompted to make a purchase:
  
<img width="559" alt="Screen Shot 2019-04-29 at 11 00 21 AM" src="https://user-images.githubusercontent.com/13972201/56905432-2fa80c80-6a6e-11e9-8327-04880bb766c1.png">

The prompt walks the user through the operations to make purchases.
  
The user is prompted to enter an item for puchase by its ID number.
  
<img width="845" alt="Screen Shot 2019-04-29 at 5 23 31 PM" src="https://user-images.githubusercontent.com/13972201/56928032-a4496e00-6aa3-11e9-8a7b-38486b1290af.png">
  
If the user  make a purchase that depletes inventory of a product, it will remove it from the menu. 
  
Otherwise, it will merely update the remaining stock quantity following the order. 
  
The data validation also checks to see if the user selects a product ID that unavailable/not found in the menu offerings.

#### (2) bamazonManager.js #####
  
On file-execution in the terminal, the user is prompted to choose what action they wish to perform:
  
<img width="697" alt="Screen Shot 2019-04-29 at 11 06 04 AM" src="https://user-images.githubusercontent.com/13972201/56905760-d55b7b80-6a6e-11e9-9db9-fe9aa3064f2d.png">
  
The user is walked-through various prompts per the action selected.

##### (2a) View All Items #####
  
<img width="524" alt="Screen Shot 2019-04-29 at 5 14 38 PM" src="https://user-images.githubusercontent.com/13972201/56927819-17061980-6aa3-11e9-8b73-773c8160c5f3.png">
  
##### (2b) View Low Inventory Items #####
  
<img width="526" alt="Screen Shot 2019-04-29 at 5 14 57 PM" src="https://user-images.githubusercontent.com/13972201/56927780-fdfd6880-6aa2-11e9-9ed8-3b4d5e1eb851.png">
  
##### (2c) Update Item Stock Quantity Inventory #####
  
<img width="652" alt="Screen Shot 2019-04-29 at 5 15 58 PM" src="https://user-images.githubusercontent.com/13972201/56927741-ea520200-6aa2-11e9-8d35-1ee34586fb51.png">
  
##### (2d) Add a new Item with Stock Quantity Inventory #####

<img width="570" alt="Screen Shot 2019-04-29 at 5 17 05 PM" src="https://user-images.githubusercontent.com/13972201/56927670-c4c4f880-6aa2-11e9-9d25-ae221be56e6b.png">
