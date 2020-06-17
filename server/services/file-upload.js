'use strict';
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = new aws.S3();
let type;
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    type = file.mimetype;
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: "remember-to-cook",
    contentType: function(req, file, cb) {
      cb(null, file.mimetype);
    },
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;

