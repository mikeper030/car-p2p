//change environment here
process.env.NODE_ENV = 'production'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");
var usersRouter = require('./api/users/users');
var carsRouter = require('./api/car_sharing/cars');
var listingsRouter = require('./api/car_sharing/listings');

// var corsOptions = {
//     origin: "http://localhost:3000"
// };

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/uploads/images/profile'));


app.use('/api', usersRouter,carsRouter,listingsRouter);


module.exports = app;
