const jsonwebtoken = require('jsonwebtoken');

function issueJWT(user) {
  const payload = {
    id: user._id,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY );

  return signedToken;

}

module.exports = issueJWT;