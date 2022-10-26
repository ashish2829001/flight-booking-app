const express = require('express');

const router = new express.Router();
const defineFlight = require('../models/defineFlight');

// add a flight details
router.post('/addFlight', async (req, res) => {
    
    try{
        if(!req.body.flight_no || !req.body.flight_name || !req.body.origin || !req.body.destination || req.body.date.length === 0 || !req.body.start_time || !req.body.end_time || !req.body.price) {
            res.status(401).json({
                success: false,
                message: "Please provide all required data..."
            })
        }
        let flightInfo = new defineFlight(req.body);
        
        await flightInfo.save();
    
        res.status(200).json({
            success: true,
            message: 'Sucessfully added!',
            flightInfo: flightInfo
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

// get flight data
router.post('/getFlightData', async (req, res) => {

    try{
        let params = {};

        if(req.body.origin) {
            params.origin = req.body.origin;
        }
        if(req.body.destination) {
            params.destination = req.body.destination;
        }
        
        // console.log(params);

        let flightInfo = await defineFlight.find(params);

        if(req.body.date) {
            flightInfo = flightInfo.filter((ele)=>{
                return ele.date.includes(req.body.date);
            })
        }
    
        res.status(200).json({
            success: true,
            message: 'Sucessfully fetched!',
            flightInfo: flightInfo
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

// get flight data by id
router.get('/getFlightById', async (req, res) => {

    try{
        
        let flightInfo = await defineFlight.findOne({flight_no: req.body.flight_no});

        if(!req.body.date) {
            flightInfo = flightInfo.filter((ele)=>{
                return ele.date.includes(req.body.date);
            })
        }
    
        res.status(200).json({
            success: true,
            message: 'Sucessfully fetched!',
            flightInfo: flightInfo
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