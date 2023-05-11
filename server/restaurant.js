const mongoose = require('mongoose');

const Restaurant = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
    },

    city: {
        type: String,
    },

    products: [{name: {type: String}, price: {type: Number}, image: {type: String}}],
});

const Restau = new mongoose.model('Restaurant',Restaurant);

module.exports = Restau;