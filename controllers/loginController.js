var { uri } = require('./databaseConnection');
const { MongoClient, ServerApiVersion } = require('mongodb');


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports.attemptLogin = function(req, res, next) {

    var value_password = req.body.password;
    var value_email = req.body.email;

    console.log("Attempting to login ... have gotten user email and password ...")
    lookUpAccount(value_email, value_password);
    // Redirect to a different file after 5 seconds
    setTimeout(function() {
        res.redirect('/');
    }, 5000); // 5000 milliseconds = 5 seconds

}


async function lookUpAccount(email, password) {
    try {
        await client.connect();

        const db = client.db("mainDataBase");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: email, password: password });

        if (user) {
            console.log("User found:", user);
            console.log("Login successful");

            // Assuming that we connect to the database here...
            module.exports = user;
        } else {
            console.log("User not found or invalid credentials");
        }
    } catch (error) {
        console.error("Error looking up account:", error);
    } finally {
        await client.close();
    }
}
