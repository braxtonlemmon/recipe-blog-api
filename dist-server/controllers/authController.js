"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../models/user"));

var _utils = _interopRequireDefault(require("../lib/utils"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = [(0, _expressValidator.body)('username', 'Username is required').trim().isLength({
  min: 1
}), (0, _expressValidator.body)('password', 'Password is required').trim().isLength({
  min: 1
}), (0, _expressValidator.body)('*').escape(), function (req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()
    });
  }

  _user["default"].findOne({
    username: req.body.username
  }).then(function (user) {
    if (!user) {
      return res.status(400).send('user not found');
    }

    _bcrypt["default"].compare(req.body.password, user.password, function (err, result) {
      if (result) {
        var token = (0, _utils["default"])(user); // const token = utils.issueJWT(user);
        // res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "Lax"  });

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000
        });
        console.log(token);
        return res.json({
          token: token,
          name: user.username
        }); // res.json({ token: token.token, expires: token.expires, name: user.username });
      } else {
        return res.send('incorrect password!');
      }
    });
  })["catch"](function (err) {
    return res.status(401).send({
      err: err
    });
  });
}];

var logout = function logout(req, res, next) {
  res.clearCookie('token');
  next();
};

var _default = {
  login: login,
  logout: logout
};
exports["default"] = _default;