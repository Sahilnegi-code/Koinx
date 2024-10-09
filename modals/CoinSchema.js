const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    "24hChange": {  
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
