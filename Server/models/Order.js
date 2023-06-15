const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  cost: { type: Number },
  nameOfCustomer: { type: String },
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Order', OrderSchema);
