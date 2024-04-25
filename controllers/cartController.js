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

const getShoppingCart = async (req, res, next) => {
    const cart = req.session.cart;
    console.log(cart);
    res.render('cart', {cart: cart});
}



const removeFromCart = async(req, res, next) => {
    var itemToRemove = req.body.productID;

    try {
        await client.connect();
        const db = client.db('mainDataBase');
        const collection = db.collection('orders')

        const user = await collection.findOne({user: req.session.user});



        let lastIndex
        // I put it into a variable, so I don't have to keep requesting the cart
        let cart = req.session.cart;

        if(user)
        {
            // Removing item from database
            await collection.updateOne({user: req.session.user}, {$pull: {cart: {$elemMatch: {$in: [itemToRemove]}}}})


            // Removing item from session
            lastIndex = -1;
            for(let i = cart.length - 1; i >= 0; i--)
            {
                if(cart[i][0] === itemToRemove)
                {
                    lastIndex = i;
                    break;
                }
            }

            // If found, remove the last instance of the item to delete
            if(lastIndex !== -1)
            {
                req.session.cart.splice(lastIndex, 1);
            }
        }
        else
        {
            // If from only sessions, remove from array normally

            // Removing item from session
            lastIndex = -1;

            // I put it into a variable, so I don't have to keep requesting
            cart = req.session.cart;
            for(let i = cart.length - 1; i >= 0; i--)
            {
                if(cart[i][0] === itemToRemove)
                {
                    lastIndex = i;
                    break;
                }
            }

            // If found, remove the last instance of the item to delete
            if(lastIndex !== -1)
            {
                req.session.cart.splice(lastIndex, 1);
            }
        }
    }
    catch (err)
    {
        console.error("An error occurred: " + err);
        next(err);
    }
    finally {
        await client.close();
    }
}

const clearCart = async (req, res, next) => {
    if(req.session.user !== "")
    {
        try {
            await client.connect();
            const db = client.db('mainDataBase');
            const collection = await db.collection('orders');

            const user = await collection.findOne({user: req.session.user});

            if(user)
            {
                // This should clear the whole document in the database
                await collection.deleteOne({user: req.session.user});
                // This should clear the session cart
                req.session.cart = [];
            }
            else
            {
                console.log("Please add something to cart first.")
            }
        }
        catch(err) {
            console.log("An error has occurred: " + err);
            next(err);
        }
        finally {
            await client.close();
        }
    }
    else
    {
        // We're just clearing the session cart
        req.session.cart = [];
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    viewCart,
    clearCart,
    getShoppingCart,
};