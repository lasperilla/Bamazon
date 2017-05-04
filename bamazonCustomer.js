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
        console.log("=======================");
        console.log(res[i].product_name);
        console.log("Price: " + res[i].price);
        if (res[i].stock_quantity > 50) {
          console.log("In stock: "+res[i].stock_quantity)
        } else if (res[i].stock_quantity > 0){
          console.log("Hurry, only "+res[i].stock_quantity+" left!") //low stock
        } else {
          console.log("Sold Out.") //sold out
        };
    };
});

connection.end();
