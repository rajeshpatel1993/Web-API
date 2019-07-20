const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();



//  /shopinglist => GET
router.get('/getshopinglist', shopController.getShopList);




module.exports = router;

