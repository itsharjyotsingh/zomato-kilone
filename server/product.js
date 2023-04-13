const mongoose = require('mongoose');

const Prod = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    desc: {
        type: String,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
    },
});

const Product = new mongoose.model('Product',Prod);

module.exports = Product;