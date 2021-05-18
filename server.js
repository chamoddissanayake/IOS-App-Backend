const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://admin:admin123@cluster0.8360c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// const uri = "mongodb+srv://admin:admin123@hotelbooking-tkjph.mongodb.net/HotelBookingDB?retryWrites=true&w=majority";

const uri = "mongodb+srv://admin:admin123@iosassignment.8360c.mongodb.net/OnlineShop?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongo Db database connection stablished successfully.");
})


const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const cartRouter = require('./routes/cart');

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/cart', cartRouter);

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});

