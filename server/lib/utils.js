const jsonwebtoken = require('jsonwebtoken');

function issueJWT(user) {
  const payload = {
    id: user._id,
    iat: Date.now(),
    exp: Math.floor(Date.now() / 1000) + 60
  };
  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY );

  return signedToken;

}

module.exports = issueJWT;