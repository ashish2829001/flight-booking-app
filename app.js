const express = require('express')
const path = require("path");
const mongoose  = require("mongoose");
const bodyparser = require('body-parser');

const flightRouter = require("./routers/flightDataApis");
const flightBookingApis = require("./routers/flightBookingApis");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "./flight-booking-app/build")));
app.use(express.static("public"))


//Body Parser Preset
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

// MongoDB connection
mongoose.connect("mongodb+srv://atsfrshr:ashish123@cluster0.itl5tbt.mongodb.net/flight_app?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("Error connecting to database",err.message);
});


// APIs
app.use('/api/flight', flightRouter);
app.use('/api/bookflight', flightBookingApis);


app.use('/*',express.static(path.join(__dirname, './flight-booking-app/build')))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})