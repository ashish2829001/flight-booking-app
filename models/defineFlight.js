const mongoose = require('mongoose');


const flightSchema = new mongoose.Schema({
    flight_no: {
        type: Number,
        required: true
    },
    flight_name: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: [String],
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    }

});

const defineFlight = mongoose.model('flight_details',flightSchema);
module.exports = defineFlight;