const router = require('express').Router();
var constants = require('../constants');

router.route('/').get((req, res) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        dbo.collection("orders").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();

            res.send(result)
        });
    });

});



router.route('/:id').get((req, res) => {
    givenOrderId = req.params['id']

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        var query = { id: Number(givenOrderId) };
        dbo.collection("orders").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send(result)
        });
    });

});

module.exports = router;
