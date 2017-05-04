const mysql = require("mysql");
const inquirer = require("inquirer")
const pass = require("./pw.js")

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: pass.pass,
    database: "Bamazon"
});

let productIdArr = [];

//open connection
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("Connection Successful. Welcome to Bamazon.");
});

//display available products
connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        productIdArr.push(res[i].item_id); //fill array with list of valid item id's
        console.log("=======================");
        console.log(res[i].product_name);
        console.log("Price: " + res[i].price + " | Product ID: " + res[i].item_id);
        if (res[i].stock_quantity > 50) {
            console.log("In stock: " + res[i].stock_quantity)
        } else if (res[i].stock_quantity > 0) {
            console.log("Hurry, only " + res[i].stock_quantity + " left!") //low stock
        } else {
            console.log("Sold Out.") //sold out
        };
    };
    console.log("----------------------");
    orderFunc();
});

//prompt user and take order
function orderFunc() {
    inquirer.prompt([{
        name: "id",
        message: "Please enter the ID of the item you would like to order:"
    }, {
        name: "quantity",
        message: "Qty:"
    }]).then(function(order) {
        if (productIdArr.indexOf(parseInt(order.id)) !== -1) {
            connection.query("SELECT stock_quantity, product_name, price FROM products WHERE item_id = " + order.id, function(err, res) {
                if (err) throw err;
                let subtotal = order.quantity * res[0].price;
                let currentInventory = res[0].stock_quantity;
                fulfillFunc(order.quantity, currentInventory, order.id); //update database
                if (order.quantity <= currentInventory) {
                    console.log("We have received your order. Thank you for using Bamazon");
                    console.log("--------------------");
                    console.log("Order Summary:");
                    console.log(res[0].product_name + " Qty:" + order.quantity);
                    console.log("Subtotal: $" + subtotal.toFixed(2));
                    connection.end();
                } else { //handle case where user inputs qty > bamazon inventory
                    console.log("Sorry, insufficient quantity. Please try again or hit ctrl+c twice to exit.")
                    orderFunc();
                }
            });
        } else { //handle case where user inputs invalid item id
            console.log("Please enter a valid Item ID or hit ctrl+c twice to exit.");
            orderFunc();
        };
    });
};

//update database inventory
function fulfillFunc(orderquant, bamazonInv, id) {
    let remainingInv = bamazonInv - orderquant;
    if (remainingInv >= 0) {
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: remainingInv
        }, {
            item_id: id
        }], function(err, res) {
            if (err) throw err;
        });
    }
};
