var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var item_id;
var productName;
var newStockQuant;
var yellow = "\x1b[33m";
var blue = "\x1b[34m";
var green = "\x1b[32m";
var magenta = "\x1b[35m";
var resetColor = "\x1b[0m";

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "BeeDP_1975",
    database: "bamazon_db"

  });

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    start();
});


  // function which prompts the user for what action they should take
function start() {

    console.log("\nBamazon Manager Activity Menu\n");

    inquirer
      .prompt({
        name: "searchChoice",
        type: "list",
        message: "Which search would you like to perform?",
        choices: ["View products for sale", 
            "View low inventory", 
            "Add to inventory", 
            "Add a new product", 
            "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.searchChoice === "View products for sale") {
            viewForSale();
           
        } else if(answer.searchChoice === "View low inventory") {
            viewLowInventory();
            
        } else if(answer.searchChoice === "Add to inventory"){
            addInventory();
        }else if(answer.searchChoice === "Add a new product"){
            addNewProduct();
        } else {
          connection.end();
          process.end;
        }
    })
}

function viewForSale(){

  console.log("\nBamazon View Items For Sale\n");

  var table = new Table({
      head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
      colWidths: [8, 20, 20, 8, 8]
  });

  connection.query("SELECT * FROM products", async function(err, results) {
      if (err) throw err;

      for (let i = 0; i < results.length; i++) {
      item_id_last = results[i].item_id;

      table.push([
          results[i].item_id,
          yellow + results[i].product_name,
          magenta + results[i].department_name,
          green + results[i].price,
          blue + results[i].stock_quantity + resetColor
      ]);
      }
  console.log(table.toString());

  });
}

function viewLowInventory(){
    
  console.log("\nBamazon For Sale Menu: LOW INVENTORY \n");

  var table = new Table({
      head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
      colWidths: [8, 20, 20, 8, 8]
  });

  connection.query("SELECT * FROM products WHERE stock_quantity <=5", async function(err, results) {
      if (err) throw err;

      for (let i = 0; i < results.length; i++) {
      item_id_last = results[i].item_id;

      table.push([
          results[i].item_id,
          yellow + results[i].product_name,
          magenta + results[i].department_name,
          green + results[i].price,
          blue + results[i].stock_quantity + resetColor
      ]);
      }
  console.log(table.toString());

  });
}

function addInventory(){

  console.log("\nUPDATE BAMAZON STOCK QUANTITY AND INVENTORY \n");

    inquirer
            .prompt([{
              name: "promptProductID",
              type: "input",
              message: "For which item--indicate by ID number--would you like to update the stock quantity?"
            },
            {
              name: "updateStockQuantity",
              type: "input",
              message: "How much should the stock quantity be after this update?"
            }
            ])
            .then(function (answer) {
              item_id = answer.promptProductID;
              console.log("the item_id is: " + item_id);
              newStockQuant = answer.updateStockQuantity;
              console.log("the updated stock count should be "+ newStockQuant);

              var query = connection.query("UPDATE products SET ? WHERE ?",
              [ {stock_quantity: newStockQuant},{item_id: item_id}], function (err, res) {
                if (err) throw err;
              console.log(res.affectedRows + " products updated!\n");

              viewForSale();
              start();
              });

            });
}

function addNewProduct(){

  console.log("Adding new product...\n");
  inquirer
    .prompt([{
      name: "promptProdName",
      type: "input",
      message: "(PRODUCT NAME) What is the name of the new product?"
    },
    {
      name: "promptDept",
      type: "list",
      choices: ["bath", "bedding", "decor", "dining", "furniture", "kitchen", "lighting", "patio", "ze-other"],
      message: "(DEPARTMENT) Into which Department should this product be placed?"
    },
    {
      name: "promptPrice",
      type: "input",
      message: "(PRICE) How MUCH should each unit of this item be priced?"
    },
    {
      name: "promptStockQuant",
      type: "input",
      message: "(INVENTORY) How MANY of this item should be to stocked in inventory?"
    }
    ])

  .then(function(answer){

    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.promptProdName,
        department_name: answer.promptDept,
        price: answer.promptPrice,
        stock_quantity: answer.promptStockQuant
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " product inserted!\n");
        viewForSale()
      })
    })
  }