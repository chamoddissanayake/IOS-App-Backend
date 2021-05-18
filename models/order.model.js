const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: {type: Number, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    orderedDate: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
