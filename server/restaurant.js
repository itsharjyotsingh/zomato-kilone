const mongoose = require('mongoose');

const Restaurant = new mongoose.Schema({
    name: {
        type: String,
    },

    city: {
        type: String,
    },

    products: [],
});

const Restau = new mongoose.model('Restaurant',Restaurant);

module.exports = Restau;