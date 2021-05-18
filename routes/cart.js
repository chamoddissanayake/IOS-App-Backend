const router = require('express').Router();
let Cart = require('../models/cart.model');
var constants = require('../constants');

router.route('/').get((req, res) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        dbo.collection("cart").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();

            res.send(result)
        });
    });

});



router.route('/:id').get((req, res) => {
    givenCartItemId = req.params['id']

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        var query = { id: Number(givenCartItemId) };
        dbo.collection("cart").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(result)
        });
    });

});



router.route('/').post((req, res1) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;;

    const secondsSinceEpoch = Math.round(Date.now() / 1000)
    const title = req.body.title;
    const price = req.body.price;
    const image = req.body.image;
    const quantity = req.body.quantity;


    const newCartItem = new Cart({
        id: secondsSinceEpoch,
        title: title,
        price: price,
        image: image,
        quantity:quantity

    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        dbo.collection("cart").insertOne(newCartItem, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
            res1.send(true);
        });
    });


})



module.exports = router;
