var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/userModel");

// Handles Success / Failure , and Returns Data
// var routeHandler = function (res, next) {
//     return function (err, data) {
//         if (err) {
//             return next(err);
//         }
//         res.send(data);
//     }
// }

//  The /User routes Go Here

//* 1 - Register New Users
router.post('/register', function (req, res, next) {
    User.register(new User({
            username: req.body.username
        }),
        req.body.password,
        function (err, user) {
            if (err) {
                console.log('Error registering!', err);
                return next(err);
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send({
                    username: req.user.username
                });
            });
        });
});

//* 2 - Login Users
router.post('/login', passport.authenticate('local'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({
        username: req.user.username
    });
});

//* 3 - Check for a Logged In User
router.get('/currentuser', function (req, res) {
    if (req.user) {
        res.send(req.user.username)
    } else {
        res.send(null)
    }
});

//* 4 - Logout Users
router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged Out');
});

module.exports = router;