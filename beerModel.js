var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var beerSchema = new Schema({
    name: String,
    style: String,
    image_url: String,
    abv: Number,
    ratings: [Number]
});

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;