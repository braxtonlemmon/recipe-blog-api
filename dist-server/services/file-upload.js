'use strict';

var aws = require('aws-sdk');

var multer = require('multer');

var multerS3 = require('multer-s3');

var s3 = new aws.S3();
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2"
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
    acl: "public-read",
    metadata: function metadata(req, file, cb) {
      cb(null, {
        filedName: 'TESTING_META_DATA!'
      });
    },
    key: function key(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
module.exports = upload;