const { uri} = require('./databaseConnection')
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const addToCart = async(product) => {
    try {
        await client.connect();
        // Connect to the right database
        // const db = client.db('DATABASE NAME');

        // Connect to the right collection
        // const collection = db.collection('COLLECTION NAME');


        // Inserting data into the collection
        // collection.insertOne({product: product, quantity: 0, MAYBE SOMETHING RELATED TO THE USER});
    }
    finally {
        await client.close();
    }
}

const removeFromCart = async(product) => {
    try {
        await client.connect();
        // Connect to the right database
        // const db = client.db('DATABASE NAME');

        // Connect to the right collection
        // const collection = db.collection('COLLECTION NAME');


        // Remove data from collection
    }
    finally {
        await client.close();
    }
}

const updateCart = async(product, quantity) => {
    try {
        await client.connect();
        // Connect to the right database
        // const db = client.db('DATABASE NAME');

        // Connect to the right collection
        // const collection = db.collection('COLLECTION NAME');


        // Update collection
    }
    finally {
        await client.close();
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    updateCart
};