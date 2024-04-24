var express = require('express');
var router = express.Router();

//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json

router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//ADD CODE HERE (REMINDER) Ellmaer will do this

var createAccountController = require("../controllers/createAccountController");

router.post("/", createAccountController.attemptCreateAccount);

module.exports = router;