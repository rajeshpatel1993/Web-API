const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();



//  /shopinglist => GET
router.get('/list', shopController.getShopList);


// /shoping/add => POST
router.post('/add', shopController.addShop);


// /shoping/edit => POST
router.get('/shop', shopController.getShop);


module.exports = router;

