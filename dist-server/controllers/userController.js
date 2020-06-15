"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = require('../models/user');

var createUser = [(0, _expressValidator.body)('username', 'username is required').trim().isLength({
  min: 1
}), (0, _expressValidator.body)('password', 'password is required').trim().isLength({
  min: 1
}), (0, _expressValidator.body)('*').escape(), function (req, res, next) {
  _bcrypt["default"].hash(req.body.password, 10, function (err, hashedPassword) {
    var errors = (0, _expressValidator.validationResult)(req);
    var user = new User({
      username: req.body.username,
      password: hashedPassword
    });

    if (!errors.isEmpty()) {
      res.send({
        user: user,
        errors: errors.array()
      });
      return;
    } else {
      user.save(function (err) {
        if (err) {
          return next(err);
        }

        res.send('user created');
      });
    }
  });
}];

var updateUser = function updateUser(req, res, next) {
  res.send('update user');
};

var destroyUser = function destroyUser(req, res, next) {
  res.send('destroy user');
};

var showUser = function showUser(req, res, next) {
  User.findById(req.params.id).then(function (user) {
    if (!user) {
      return res.send('user not found');
    }

    res.send(user);
  })["catch"](function (err) {
    return next(err);
  });
};

var _default = {
  createUser: createUser,
  updateUser: updateUser,
  destroyUser: destroyUser,
  showUser: showUser
};
exports["default"] = _default;