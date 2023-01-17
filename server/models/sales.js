const mongoose = require("mongoose");

let salesSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },
    buyer_email: { type: String, required: true },
    shoes: [String],
    total: { type: Number, required: true },
  },
  {
    collection: `sales`,
    versionKey: false,
  }
);

module.exports = mongoose.model(`sales`, salesSchema);
