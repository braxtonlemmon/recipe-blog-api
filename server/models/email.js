const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  address: { type: String, required: true, max: 254 },
  subscriberId:      { type: String, required: true }
})

module.exports = mongoose.model('Email', EmailSchema);