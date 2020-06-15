"use strict";

var passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy;

var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user'); // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),


var cookieExtractor = function cookieExtractor(req) {
  var token = req && req.cookies ? req.cookies.token : null;
  return token;
};

var options = {
  // jwtFromRequest: req => req.cookies.token,
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_OR_KEY
};
var strategy = new JwtStrategy(options, function (payload, next) {
  User.findById(payload.id, function (err, user) {
    console.log('found');
    console.log(user.username);

    if (err) {
      return next(err, false);
    }

    if (user) {
      return next(null, user);
    }

    return next(null, false);
  });
});
passport.use(strategy);