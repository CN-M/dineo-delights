const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imgSrc: [
    { type: String },
  ],
  slug: { type: String },
  onSale: { type: Boolean },
  isProductNew: { type: Boolean },
  stars: { type: Number },
  originalPrice: { type: Number },
  price: { type: Number },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
