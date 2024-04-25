var { uri } = require('./databaseConnection');
const { MongoClient, ServerApiVersion } = require('mongodb');

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

        req.session.user = value_email;
        console.log("User: " + value_email + " has logged in.");

        // Clearing cart
        req.session.cart = [];
        // Restoring cart;
        req.session.cart = await restoreCart(value_email);

        console.log(req.session.cart);

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

        return await usersCollection.findOne({ email: email, password: password }); // Return user if found
    } catch (error) {
        throw error; // Throw error if encountered
    } finally {
        await client.close();
    }
}

// Needs to happen upon login
async function restoreCart(email) {
    try
    {
        await client.connect();
        const db = client.db('mainDataBase');
        const collection = db.collection('orders');

        const user = await collection.findOne({user: email})
        if(user)
        {
            console.log("This is from the function: " + user.cart);
            return user.cart;
        }
        else
        {
            console.log("No existing cart data...");
            return [];
        }
    }
    catch(err)
    {
        throw err;
    }
    finally
    {
        await client.close();
    }
}
