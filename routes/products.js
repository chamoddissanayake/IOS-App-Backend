const router = require('express').Router();
var constants = require('../constants');


router.route('/featured').get((req, res) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        dbo.collection("featured_products").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();

            res.send(result)
        });
    });

});



router.route('/featured/:id').get((req, res) => {
    givenProductId = req.params['id']

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        var query = { id: Number(givenProductId) };
        dbo.collection("featured_products").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(result)
        });
    });

});






router.route('/new').get((req, res) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        dbo.collection("new_products").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();

            res.send(result)
        });
    });

});



router.route('/new/:id').get((req, res) => {
    givenProductId = req.params['id']

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        var query = { id: Number(givenProductId) };
        dbo.collection("new_products").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(result)
        });
    });

});






module.exports = router;
