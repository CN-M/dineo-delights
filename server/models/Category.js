const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  slug: { type: String },
});

module.exports = mongoose.model('Category', CategorySchema);
