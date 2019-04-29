# inventoryOrderJawn_Bamazon
  
This is a product sales and inventory order management platform of to demonstrate the interoperabiltiy between SQL and node.JS
  
There are two (2) functional apps for this repository, *bamazonCustomer.js* and *bamazonManager.js*
  
A database, bamazon_db was set-up, and is executable with the *bamazon_seeds.sql file* 

The following screenshots walk the user through how each app operates:
  
#### (1) bamazonCustomer.js #####

On file-execution in the terminal, the user is prompted with the Sales menu and prompted to make a purchase:
  
<img width="559" alt="Screen Shot 2019-04-29 at 11 00 21 AM" src="https://user-images.githubusercontent.com/13972201/56905432-2fa80c80-6a6e-11e9-8327-04880bb766c1.png">

The prompt walks the user through the operations to make purchases.
  
The user is prompted to enter an item for puchase by its ID number.
  
If the user  make a purchase that depletes inventory of a product, it will remove it from the menu. Otherwise, it will merely update the order remaining. The data validation also handles if the user is selecting a product ID that is out of range of the menu offerings.

#### (2) bamazonManager.js #####
  
On file-execution in the terminal, the user is prompted to choose what action they wish to perform:
  
<img width="697" alt="Screen Shot 2019-04-29 at 11 06 04 AM" src="https://user-images.githubusercontent.com/13972201/56905760-d55b7b80-6a6e-11e9-9db9-fe9aa3064f2d.png">
  
The user is walked-through various prompts per the action selected.

##### (2a) View All Items #####
  

  
##### (2b) View Low Inventory Items #####
  

  
##### (2c) Update Item Stock Quantity Inventory #####
  

  
##### (2d) Add a new Item with Stock Quantity Inventory #####

<img width="570" alt="Screen Shot 2019-04-29 at 5 17 05 PM" src="https://user-images.githubusercontent.com/13972201/56927670-c4c4f880-6aa2-11e9-9d25-ae221be56e6b.png">
