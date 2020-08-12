const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const RecipeSchema = new Schema({
  title:        { type: String,   required: true },
  ingredients:  { type: Array,   required: true },
  steps:        { type: Array,   required: true },

  size:         { type: String,  required: true },
  intro:        { type: String,  required: true },
  quote:        { type: String,  required: true },
  images:       { type: Array,   required: true },
  is_published: { type: Boolean, default: false },
  publish_date: { type: Date,    default: '' },
  created:      { type: Date,    default: Date.now() },
  
  description:  { type: String,  required: true },
  keywords:     { type: String,  required: true },
  prep_time:    { type: Number,  required: true }, // transform later
  cook_time:    { type: Number,  required: true }, // transform later
  category:     { type: String,  required: true },
  cook_method:  { type: String,  required: true },
  cuisine:      { type: String,  required: true },
  ratings:      { type: Array,   default: [] }, // average total later

  newsletter:   { type: Boolean, default: false } // indicates if newsletter has been sent for recipe
});

RecipeSchema.set('toObject', { virtuals: true });
RecipeSchema.set('toJSON', { virtuals: true })

RecipeSchema.virtual('url')
.get(function () {
  return `/recipe/${this._id}`;
});

RecipeSchema.virtual('date_formatted')
.get(function () {
  return moment(this.created).format('MMMM Do YYYY')
});

RecipeSchema.virtual('publish_date_formatted')
.get(function() {
  return moment(this.publish_date).format('MMMM Do YYYY')
});

RecipeSchema.virtual('duration_formatted')
.get(function () {
  if (this.duration > 60) {
    const hours = Math.round(this.duration / 60);
    const mins = this.duration % 60;
    return `${hours}h ${mins}min`
  } else {
    return `${this.duration} min`
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);