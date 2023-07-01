const path = require('path');
const express = require('express');
const { isLoggedIn } = require('./helpers');
const { Store } = require('../models');
const router = express.Router();


//localhost:5000/store
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
            const stores = await Store.findAll({});
            res.render('store-list', {
                port: process.env.PORT,
                api: 'store/info',
                stores: stores.map(v => v) 
            });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//localhost:5000/store/info/:storeId
router.get('/info/:storeId', async (req, res, next) => {
    try {
        const store = await Store.findOne({
            where: { storeId: req.params.storeId }
        });
        res.render('store-info', {
            store,
            port:process.env.PORT
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.get('/')

module.exports = router;
