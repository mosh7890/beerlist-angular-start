var express = require('express');
var router = express.Router();
var Beer = require("../models/beerModel");

//* Handles Success / Failure , and Returns Data
var routeHandler = function (res, next) {
    return function (err, data) {
        if (err) {
            return next(err);
        }
        res.send(data);
    }
}

//! Check for Authenticated Users
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status('401').send({
            message: "Unauthorized"
        });
    }
};

var ensureAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        return next();
    } else {
        return res.status('401').send({
            message: 'Unauthorized'
        });
    }
};

var ensureIsCurrentUserReview = function (req, res, next) {
    Beer.findById(req.params.beerID, function (err, data) {
        if (err) {}
        if (req.isAuthenticated() && (req.user.username === data.reviews.id(req.params.reviewID).username || req.user.admin)) {
            return next();
        } else {
            return res.status('401').send({
                message: 'Unauthorized'
            });
        }
    });
}

//*  The /Beer routes Go Here

//* 1 - Get All Beers
router.get('/', function (req, res, next) {
    Beer.find(routeHandler(res, next));
});

//* 2 - Add a Beer
router.post('/', ensureAdmin, function (req, res, next) {
    var myBeer = new Beer(req.body);
    myBeer.save(routeHandler(res, next));
});

//* 3 - Delete a Beer
router.delete('/:beerID', ensureAdmin, function (req, res, next) {
    Beer.findByIdAndRemove(req.params.beerID, routeHandler(res, next));
});

//* 4 - Add Beer Ratings
router.post('/:beerID/ratings', ensureAuthenticated, function (req, res, next) {
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

//* 5 - Update Beer Info (name, style, image, abv)
router.put('/:beerID', ensureAdmin, function (req, res, next) {
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

//* 6 - Add Beer Reviews
router.post('/:beerID/reviews', ensureAuthenticated, function (req, res, next) {
    var update = {
        $push: {
            reviews: req.body
        }
    };
    Beer.findByIdAndUpdate(req.params.beerID, update, {
        new: true
    }, routeHandler(res, next));
});

//* 7 - Delete Beer Reviews
router.delete('/:beerID/reviews/:reviewID', ensureIsCurrentUserReview, function (req, res, next) {
    var update = {
        $pull: {
            reviews: {
                _id: req.params.reviewID
            }
        }
    };
    Beer.findByIdAndUpdate(req.params.beerID, update, {
        new: true
    }, routeHandler(res, next));
});

//* 8 - Get Current Beer on Refresh
router.get('/:beerID', function (req, res, next) {
    Beer.findById(req.params.beerID, routeHandler(res, next));
});

module.exports = router;