var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/userModel");

//*  The /User routes Go Here
//* 1 - Register New Users
router.post('/register', function (req, res, next) {
    if (req.body.username === 'Moshe' || req.body.username === 'Irad') {
        admin = true;
    } else {
        admin = false;
    };
    User.register(new User({
            username: req.body.username,
            admin: admin
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
                    username: req.user.username,
                    admin: req.user.admin
                });
            });
        });
});

//* 2 - Login Users
router.post('/login', passport.authenticate('local'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send({
        username: req.user.username,
        admin: req.user.admin
    });
});

//* 3 - Check for a Logged In User
router.get('/currentuser', function (req, res) {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send('No Current User');
    }
});

//* 4 - Logout Users
router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged Out');
});

//* 5 - Get Users
// router.get('/', function (req, res) {
//     User.find(function (err, data) {
//         if (err) {
//             return next(err);
//         }
//         res.send(data);
//     });
// })

module.exports = router;