const mongoose = require("mongoose");

let salesSchema = new mongoose.Schema(
  {
    buyer_email: { type: String, required: true },
    shoes: [Number],
    total: { type: Number, required: true },
  },
  {
    collection: `sales`,
    versionKey: false,
  }
);

module.exports = mongoose.model(`sales`, salesSchema);
