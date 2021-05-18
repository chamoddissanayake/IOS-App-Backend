const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: {type: Number, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    quantity:{type: Number, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
