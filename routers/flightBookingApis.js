const express = require('express');

const router = new express.Router();

const bookingData = require('../models/defineBookingData');
const sendMail = require('../services/sendMail');

// add a flight details
router.post('/addBooking', async (req, res) => {
    
    try{
        if(!req.body.passenger_name || !req.body.passenger_phone || !req.body.passenger_email || !req.body.flight_no || !req.body.age) {
            res.status(401).json({
                success: false,
                message: "Please provide all required data..."
            })
        }
        let bookingInfo = new bookingData(req.body);
        
        await bookingInfo.save();
        sendMail(req.body.passenger_email, req.body.passenger_name, req.body.flight_no);

        res.status(200).json({
            success: true,
            message: 'Sucessfully added!',
            bookingInfo: bookingInfo
        });
    } catch(err) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error...",
            error: err
        })
    }
})


// add a flight details
router.get('/getAllBookings', async (req, res) => {
    
    try{
        let bookingInfo = await bookingData.find({});
    
        res.status(200).json({
            success: true,
            message: 'Sucessfully fetched',
            bookingInfo: bookingInfo
        });
    } catch(err) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error...",
            error: err
        })
    }
})

// exporting module
module.exports = router;