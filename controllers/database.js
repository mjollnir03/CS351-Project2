//WILL USE THIS ( as a template ) FILE TO CONNECT TO MONGODB
//LOGIC TO USE MONGODB WILL GO HERE AS WELL

//BELOW IS AN IDEA OF HOW TO CONNECT TO THE DATABASE
var { uri } = require('./databaseConnection');

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// TESTED AND WORKS!

//BELOW WOULD BE THE FUNCTIONS IN THE FORMAT OF ...
// module.exports.functionName = function(req, res, next) { ... }

//ANY FUNCTION THAT CONNECTS TO THE MONGODB-DATABASE DIRECTLY SHOULD BE ...
// async function otherFunction() {
//   try { ... }
//   finally { ... }
// }