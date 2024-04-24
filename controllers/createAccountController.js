var { uri } = require('./databaseConnection');

const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//ADD CODE HERE (REMINDER) Ellmaer Will do this

module.exports.attemptCreateAccount = async function(req, res, next){
    res.render('createAccountResult');
}

async function checkAccountExistance(email, password) {
    try {

    } catch (error) {

    }
    finally {

    }

}