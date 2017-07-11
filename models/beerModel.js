var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    username: String,
    review: String,
});

var beerSchema = new Schema({
    name: String,
    style: String,
    image_url: String,
    abv: Number,
    ratings: [Number],
    avgRating: Number,
    reviews: [reviewSchema],
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;