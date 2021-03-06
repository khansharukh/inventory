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

    var tbl_products = "CREATE TABLE IF NOT EXISTS `inventory`.`products` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `uid` INT(11) NOT NULL , `name` VARCHAR(255) NOT NULL , `description` TEXT NOT NULL , `in_stock` ENUM('yes','no') NOT NULL DEFAULT 'yes' , `created_at` DATETIME NOT NULL , PRIMARY KEY (`id`))";
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

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Hurray!"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// get all products
app.get('/products/:uid', function(req, res) {
    var $id = req.params.uid;
    con.query("SELECT * FROM `products` WHERE `uid` = '"+$id+"' ORDER BY `created_at` ASC", function (err, result) {
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
    var insert_data  = {uid: req.body.user_id, name: req.body.name, description: req.body.description, in_stock: req.body.in_stock, created_at: moment().format("YYYY-MM-DD HH:mm:ss")};
    var query = con.query('INSERT INTO `products` SET ?', insert_data, (err, result) => {
        // Neat!
        res.send({"status": 200, "error": null, "response": insert_data});
    })
});
// update product
app.post('/product/update/:id', function (req, res) {
    var name =  req.body.name;
    var in_stock =  req.body.in_stock;
    var description =  req.body.description;
    var $id = req.params.id;
    var query = con.query("UPDATE `products` SET `name` = '"+name+"', `in_stock` = '"+in_stock+"', `description` = '"+description+"' WHERE id = '"+$id+"' LIMIT 1", (err, result) => {
        // Neat!
        res.send({"status": 200, "error": null, "response": $id});
    })
});
// delete product
app.delete('/product/delete/:id', function(req, res) {
    var $id =  req.params.id;
    var sql = "DELETE FROM `products` WHERE id = '"+$id+"' LIMIT 1";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send({"status": 200, "error": null, "response": "Number of records deleted is 1: " + $id});
    });
});

// auth user
app.post('/user/login', function (req, res) {
    var email =  req.body.ip_email;
    var pass =  req.body.ip_pass;
    var query = con.query("SELECT * FROM `users` WHERE `email` = '"+email+"' AND `password` = '"+pass+"' LIMIT 1", (err, result) => {
        // Neat!
        res.send({"status": 200, "error": null, "response": result});
    })
});
