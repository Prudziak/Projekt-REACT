const mongoose = require(`mongoose`);

let shoesSchema = new mongoose.Schema(
  {
    brand: { type: String },
    model: { type: String },
    colour: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    stock: { type: Number },
    sold_pairs: { type: Number, default: 0 },
  },
  {
    collection: `shoes`,
    versionKey: false,
  }
);

module.exports = mongoose.model(`shoes`, shoesSchema);
