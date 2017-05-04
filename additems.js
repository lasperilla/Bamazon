const mysql = require('mysql');
const inquirer = require('inquirer')
const pass = require('./pw.js')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: pass.pass,
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

let productsArr = [
    { "product_name": "Cat Lady Action Figure DX", "department_name": "Toys", "price": 14.19, "stock_quantity": 1200 },
    { "product_name": "Bath Buzz Caffeinated Soap (Peppermint)", "department_name": "Health & Beauty", "price": 11.69, "stock_quantity": 480 },
    { "product_name": "The Selfie Remote Shutter Release", "department_name": "Electronics", "price": 13.62, "stock_quantity": 1000 },
    { "product_name": "Unicorns Are Jerks: A Coloring Book Exploring The Cold, Hard, Sparkly Truth", "department_name": "Books", "price": 6.99, "stock_quantity": 12 },
    { "product_name": "Canned Unicorn Meat", "department_name": "Grocery", "price": 17.38, "stock_quantity": 960 },
    { "product_name": "Smuggle Your Booze Tampon Flask and Funnel", "department_name": "Sport", "price": 18.59, "stock_quantity": 600 },
    { "product_name": "One Pound of Cereal Marshmallows", "department_name": "Grocery", "price": 14.99, "stock_quantity": 1200 },
    { "product_name": "Men’s Handerpants", "department_name": "Apparel", "price": 8.39, "stock_quantity": 120 },
    { "product_name": "Emergency Inflatable Rubber Chicken", "department_name": "Toys", "price": 24.99, "stock_quantity": 2400 },
    { "product_name": "Face-Butt Towel", "department_name": "Bath", "price": 12.34, "stock_quantity": 624 }
];

for (var i = 0; i < productsArr.length; i++) {
  // console.log(productsArr[i].product_name)
  connection.query("INSERT INTO products SET ?", productsArr[i], function(err, res) {
    if (err) throw err;
    console.log(productsArr[i].product_name+" added.")
  });
}

connection.end();