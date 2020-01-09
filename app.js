const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var moment = require('moment');

// create express app
const app = express();

// create database inventory and add db credentials and details
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'inventory',
    multipleStatements: true
});
// connection to db
con.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");

    var tbl_products = "CREATE TABLE IF NOT EXISTS `inventory`.`products` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `in_stock` ENUM('yes','no') NOT NULL DEFAULT 'yes' , `created_at` DATETIME NOT NULL , PRIMARY KEY (`id`))";
    con.query(tbl_products, function (err, result) {
        if (err) throw err;
        //console.log("Inventory table created");
    });
    var tbl_users = "CREATE TABLE IF NOT EXISTS `inventory`.`users` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `name` VARCHAR(50) NOT NULL , `email` VARCHAR(100) NOT NULL , `password` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , PRIMARY KEY (`id`))";
    con.query(tbl_products, function (err, result) {
        if (err) throw err;
        //console.log("User table created");
    });
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Hurray!"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// get all products
app.get('/products', function(req, res) {
    con.query("SELECT * FROM `products` WHERE `in_stock` = 'yes' ORDER BY `created_at` ASC", function (err, result) {
        if (err) throw err;
        res.send({"status": 200, "error": null, "response": result});
    });
});
// get single product
app.get('/product/:id', function(req, res) {
    var $id = req.params.id;
    con.query("SELECT * FROM `products` WHERE `id` = '"+$id+"' LIMIT 1", function (err, result) {
        if (err) throw err;
        res.send({"status": 200, "error": null, "response": result});
    });
});
// add new product
app.post('/product/add', function(req, res) {
    var insert_data  = {name: req.body.name, description: req.body.description, in_stock: req.body.in_stock, created_at: moment().format("YYYY-MM-DD HH:mm:ss")};
    var query = con.query('INSERT INTO `products` SET ?', insert_data, (err, result) => {
        // Neat!
        res.send({"status": 200, "error": null, "response": insert_data});
    })
});