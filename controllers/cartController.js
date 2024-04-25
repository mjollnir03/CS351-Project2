const { uri} = require('./databaseConnection')
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const session = require('express-session')

const app = express();

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const addToCart = async(req, res, next) => {
    var productID = req.body.productID;
    var price = req.body.price;
    console.log(productID);
    console.log(price);

    req.session.cart.push([productID, price]);

    console.log(req.session);
    console.log(req.sessionID);
    console.log("User: " + req.session.user);

    if(req.session.user !== "") {
        try {
            await client.connect();

            const db = client.db('mainDataBase');
            const collection = db.collection('orders');

            const user = await collection.findOne({user: req.session.user})
            if (user) {
                console.log("Updating...");
                const updateCart = await collection.updateOne({user: req.session.user}, {$push: {"cart": [productID, price]}});
            } else {
                console.log(req.session.cart);

                await collection.insertOne({user: req.session.user, cart: req.session.cart});
                console.log("Inserted");
            }
        } catch (err) {
            throw err;
        } finally {
            await client.close();
        }
    }

    res.redirect('/');
}

// Test function
const viewCart = async(req, res, next) => {
    res.status(200).json(req.session.cart);
};

const removeFromCart = async(res, req, next) => {
    var itemToRemove = req.body.productID;

    try {
        await client.connect();
        const db = client.db('mainDataBase');
        const collection = db.collection('orders')

        const user = await collection.findOne({user: req.session.user});
        if(user)
        {
            await collection.updateOne({user: req.session.user}, {$pull: {cart: {$elemMatch: {$in: [itemToRemove]}}}})
        }
        else
        {
            console.log("User not found to remove an item from cart")
            // If from only sessions, remove from array normally
        }
    }
    catch (err)
    {
        throw err;
    }
    finally {
        await client.close();
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    viewCart
};