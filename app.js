const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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