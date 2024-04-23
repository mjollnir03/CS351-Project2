const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, updateCart} = require('../controllers/cartController');

// Add to cart router
router.post('/cart/add', async (req, res) => {
   // Adding to cart
});

// Remove from cart router
router.post('/cart/remove', async (req, res) => {
    // Adding to cart
});

// Updating the cart router
router.post('/cart/update', async (req, res) => {
    // Adding to cart
});