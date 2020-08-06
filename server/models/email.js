const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  address: { type: String, required: true, max: 254 }
})

module.exports = mongoose.model('Email', EmailSchema);