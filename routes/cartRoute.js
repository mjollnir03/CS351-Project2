const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, viewCart, clearCart, getProducts } = require('../controllers/cartController'); // This is a bit redundant, but for some reason, the application didn't want to run without this
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

router.get('/clearCart', cartController.clearCart)

router.get('/getProducts', cartController.getProducts);

module.exports = router;