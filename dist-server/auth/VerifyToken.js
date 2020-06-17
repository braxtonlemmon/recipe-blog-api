"use strict";

var jwt = require('jsonwebtoken');

var generatePolicy = function generatePolicy(principalId, effect, resource) {
  var authResponse = {};
  authResponse.principalId = principalId;

  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};

module.exports.auth = function (event, context, callback) {
  var token = event.authorizationToken;

  if (!token) {
    return callback(null, 'Unauthorized');
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return callback(null, 'Unauthorized');
    }

    return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn));
  });
};