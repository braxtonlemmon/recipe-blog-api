"use strict";

var jsonwebtoken = require('jsonwebtoken');

function issueJWT(user) {
  // const expiresIn = 30;
  var payload = {
    id: user._id,
    // data: JSON.stringify(user),
    iat: Date.now()
  };
  var signedToken = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY); // return res.cookie('token', signedToken, {
  //   secure: false,
  //   httpOnly: true,
  // });

  return signedToken; // return {
  //   token: "Bearer " + signedToken
  // }
}

module.exports = issueJWT; // module.exports.issueJWT = issueJWT