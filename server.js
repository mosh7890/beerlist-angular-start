var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/beers', {
  useMongoClient: true
});

var app = express();

var Beer = require('./beerModel.js');

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Handles Success / Failure , and Returns Data
var routeHandler = function (res, next) {
  return function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(data);
  }
}

// 1 - Get All Beers
app.get('/beers', function (req, res, next) {
  Beer.find(routeHandler(res, next));
});

// 2 - Add A Beer
app.post('/beers', function (req, res, next) {
  var myBeer = new Beer(req.body);
  myBeer.save(routeHandler(res, next));
});

// 3 - Delete Beer
app.delete('/beers/:beerID', function (req, res, next) {
  Beer.findByIdAndRemove(req.params.beerID, routeHandler(res, next));
});

// 4 - Update A Beer
app.put('/beers/:beerID', function (req, res, next) {
  var update = {
    $set: {
      name: req.body.name,
      style: req.body.style,
      image_url: req.body.image_url,
      abv: req.body.abv
    }
  };
  Beer.findByIdAndUpdate(req.params.beerID, update, {
    new: true
  }, routeHandler(res, next));
});

// 5 - Rate an Existing Beer 
app.post('/beers/:beerID/ratings', function (req, res, next) {
  Beer.findById(req.params.beerID, function (err, data) {
    data.ratings.push(req.body.ratings);
    if (req.body.ratingsTotal > 0) {
      data.avgRating = ((req.body.ratingsTotal + parseInt(req.body.ratings)) / data.ratings.length);
    } else {
      data.avgRating = req.body.ratings;
    }
    data.save(routeHandler(res, next));
  });
});

// error handler to catch 404 route errors and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});