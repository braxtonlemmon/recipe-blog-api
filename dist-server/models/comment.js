"use strict";

var moment = require('moment');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    max: 1000
  },
  name: {
    type: String,
    max: 100
  },
  created: {
    type: Date,
    required: true
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
CommentSchema.set('toObject', {
  virtuals: true
});
CommentSchema.set('toJSON', {
  virtuals: true
});
CommentSchema.virtual('dateFormatted').get(function () {
  return moment(this.created).format('MMMM Do YYYY, h:mm a');
});
module.exports = mongoose.model('Comment', CommentSchema);