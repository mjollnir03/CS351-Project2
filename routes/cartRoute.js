const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, viewCart } = require('../controllers/cartController');
const cartController  = require('../controllers/cartController');

// Add to cart
// router.post('/add/:id', async (req, res) => {
//    var product = req.params.id;
//
//    await addToCart(product);
//    res.redirect('/' + product);
// });



router.post('/addToCart', cartController.addToCart);

router.post('/removeFromCart', cartController.removeFromCart);

router.get('/view', cartController.viewCart);

module.exports = router;