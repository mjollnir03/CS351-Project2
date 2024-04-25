var { uri } = require('./databaseConnection');
const { MongoClient, ServerApiVersion } = require('mongodb');
const session = require('express-session');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports.attemptLogin = async function(req, res, next) {
    var value_password = req.body.password;
    var value_email = req.body.email;

    console.log("Attempting to login ... have gotten user email and password ...")

    try {
        const user = await lookUpAccount(value_email, value_password);
        req.session.user = user ? value_email : ""; // Set session user to email if user exists, otherwise set it to an empty string
        console.log(req.session.user); // Log session user
        res.render('loginResult', { userFound: !!user }); // Render loginResult.ejs with userFound variable
    } catch (error) {
        console.error("Error looking up account:", error);
        res.render('loginResult', { userFound: false }); // Render loginResult.ejs with userFound variable set to false in case of error
    }
}


async function lookUpAccount(email, password) {
    try {
        await client.connect();

        const db = client.db("mainDataBase");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: email, password: password });

        return user; // Return user if found
    } catch (error) {
        throw error; // Throw error if encountered
    } finally {
        await client.close();
    }
}
