'use strict';

var aws = require('aws-sdk');

var multer = require('multer');

var multerS3 = require('multer-s3');

var path = require('path');

var s3 = new aws.S3();
var type;
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2"
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    type = file.mimetype;
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

var upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: "remember-to-cook",
    contentType: function contentType(req, file, cb) {
      cb(null, file.mimetype);
    },
    acl: "public-read",
    metadata: function metadata(req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function key(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
module.exports = upload;