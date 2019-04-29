var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var item_id;
var item_id_last;
var orderCount;
var inventoryCount;
var remainCount;
var productName;
var deptName;
var price;
var total;
var yellow = "\x1b[33m";
var blue = "\x1b[34m";
var green = "\x1b[32m";
var magenta = "\x1b[35m";
var resetColor = "\x1b[0m";

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
    afterConnection();
});

function afterConnection() {
    // connection.query("SELECT * FROM products", function (err, results) {
    //     if (err) throw err;

    //     // console.log(results);

    //     // HORIZONTAL TABLE IMPLEMENTATION
    //     var table = new Table({
    //         head: ['item_id', 'product', 'department', 'price','stock quantity']
    //       , colWidths: [8, 12,10,8,8]
    //     });

    //     for (var i = 0; i < results.length; i++) {

    //         item_id_last = parseInt(results[i].item_id);
    //         item_id = parseInt(results[i].item_id);
    //         productName = results[i].product_name;
    //         deptName=results[i].department_name;
    //         price=results[i].price;
    //         stock_quantity=results[i].stock_quantity;
            
    //         // HORIZONTAL IMPLEMENTATION
    //         table.push([item_id, productName, deptName, price, stock_quantity])
    //     }

    //     console.log(table.toString());
    
    console.log("\nBamazon For Sale Menu\n");

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
    // itemsForSale();
    purchase()

    });
}

function itemsForSale(){

    console.log("\nBamazon For Sale Menu\n");

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

function purchase() {
    inquirer
        .prompt({
            name: "promptOrder",
            type: "input",
            message: "Which item--by ID number--would you like to purchase?"
        })
        // })
        .then(function (answer) {
            item_id = parseInt(answer.promptOrder);
            if (item_id >= 1 && item_id <= item_id_last) {
                connection.query("SELECT * FROM products where item_id=?", answer.promptOrder, function (err, results) {
                    if (err) throw err;
                    item_id = results[0].item_id;
                    productName = results[0].product_name;
                    deptName = results[0].department_name;
                    price = results[0].price;
                    inventoryCount = results[0].stock_quantity;
                    checkInventory();
                })
            } else {
                console.log("You have made an invalid choice. Please re-run the file and begin again.");
                //break
            }
        })
}

function checkInventory() {
    inquirer
        .prompt({
            name: "requestOrder",
            type: "input",
            message: "How many would you like to purchase?"
        })
        .then(function (answer) {
            orderCount = answer.requestOrder;
            remainCount = inventoryCount - orderCount;

            //LOOK UP PRICE FOR item_id 
            // connection.query("SELECT price FROM products where item_id=?", item_id, function (err, results) {
            //     if (err) throw err;
            //     console.log(results);
            //     price = results[0].price;
            //     console.log("The price is: " + price);
            // });

            if (remainCount < 0) {

                console.log("Your order exceeds the available inventory. Please re-run the file and begin again.")
                connection.end();

                // DISPLAY A MESSAGE ABOUT GETTING THE LAST ONE
                // DELETE THE PRODUCT
            } else if (remainCount === 0) {

                deleteProduct()
                printReport()
                
            } else {

                updateProduct()
            }
        });
};

function updateProduct() {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: remainCount
            },
            {
                item_id: item_id
            }
        ],
        function (err, res) {
            if (err) throw err;
        }
    );
    // logs the actual query being run
    printReport()
}

function printReport() {
        total = price * orderCount
        
        console.log("You have completed a purchase of " + orderCount + " unit(s) of " + productName + " for a cost of " + price + " each, which equals a total price of: $" + total);
        
        inquirer
            .prompt({
            name: "searchChoice",
            type: "list",
            message: "What would you like to do next?",
            choices: ["Make another purchase",
            "View remaining items for sale",  
            "EXIT"]
        })
            .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.searchChoice === "Make another purchase") {
                itemsForSale();
                purchase();
            } else if(answer.searchChoice === "View remaining items for sale"){
                itemsForSale();
                connection.end();
                process.exit;
            }else {
                connection.end();
                process.exit;
            }
        })
}

function deleteProduct() {

    connection.query(
      "DELETE FROM products WHERE ?",
      {
        item_id: item_id
      },
      function(err, results) {
        if (err) throw err;
        console.log(results.affectedRows + " products deleted!\n");
      }
    );

    itemsForSale();

  };

