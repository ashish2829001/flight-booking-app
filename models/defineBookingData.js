const mongoose = require('mongoose');


const bookingInfo = new mongoose.Schema({
    passenger_name: {
        type: String,
        required: true
    },
    passenger_phone: {
        type: String,
        required: true
    },
    passenger_email: {
        type: String,
        required: true
    },
    flight_no: {
        type: Number,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
});

const bookingData = mongoose.model('booking_details', bookingInfo);
module.exports = bookingData;