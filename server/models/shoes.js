const mongoose = require(`mongoose`);

let shoesSchema = new mongoose.Schema(
  {
    brand: { type: String },
    model: { type: String },
    colour: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
  },
  {
    collection: `shoes`,
  }
);

module.exports = mongoose.model(`shoes`, shoesSchema);
