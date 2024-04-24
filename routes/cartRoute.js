const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, updateCart, viewCart } = require('../controllers/cartController');
const cartController  = require('../controllers/cartController');

// Add to cart
// router.post('/add/:id', async (req, res) => {
//    var product = req.params.id;
//
//    await addToCart(product);
//    res.redirect('/' + product);
// });

router.post('/addToCart', cartController.addToCart);

// Remove from cart
router.post('/remove/:id', async (req, res) => {
    var product = req.params.id;

    await removeFromCart(product);
    // May change where this is redirected to later
    res.redirect('/' + product);
});

// Updating the cart
router.post('/update/:id/:q', async (req, res) => {
    var product = req.params.id;
    var quantity = req.params.q;

    await updateCart(product, quantity);
    // May change where this is redirected later
   res.redirect('/' + product);
});

router.get('/view', cartController.viewCart);

module.exports = router;