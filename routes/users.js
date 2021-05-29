const router = require('express').Router();
let User = require('../models/user.model');
var constants = require('../constants');

router.route('/').get((req, res) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        dbo.collection("users").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();

            res.send(result)
        });
    });

});



router.route('/:username').get((req, res) => {
    givenUsername = req.params['username']

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        var query = { username: givenUsername };
        dbo.collection("users").findOne(query, function(err, result) {
            if (err) throw err;
            db.close();
            res.send(result)
        });
    });

});

router.route('/validate').post((req, res1) => {
    console.log("aaa")
    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;;

    const inputUsername = req.body.username;
    const inputPassword = req.body.password;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        var query = { username: inputUsername , passive:inputPassword };
        dbo.collection("users").findOne({username: { $eq: inputUsername },password: { $eq: inputPassword }}, function(err, result) {
            if (err) {
                throw err
                // print("***")
                // print(err)
                // res.send(401, 'incorrect');
                // print("***")
            };
            db.close();
            if (result == null){
                res1.send(401, 'incorrect');
            }else{
                res1.send(result)
            }


        });
    });


})


router.route('/').post((req, res1) => {

    var MongoClient = require('mongodb').MongoClient;
    var url = constants.MONGO_URL;;

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const newUserItem = new User({
        username: username,
        password: password,
        email: email
    });

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("OnlineShop");
        dbo.collection("users").insertOne(newUserItem, function(err2, res) {
            if (err2){
                console.log(err2);
                res1.send(401, 'error');
            }else{
                console.log("1 document inserted");
                db.close();
                res1.send(true);
            }
        });
    });


})


module.exports = router;
