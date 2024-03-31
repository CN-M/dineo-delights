const mongoose = require('mongoose');

const DealOfTheWeekSchema = new mongoose.Schema({
  // deadline: { type: Date },
  deadline: { type: String },
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});

module.exports = mongoose.model('DealOfTheWeek', DealOfTheWeekSchema);
