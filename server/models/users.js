const mongoose = require(`mongoose`);

let usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    firstname: { type: String, default: `not given` },
    lastname: { type: String, default: `not given` },
    accessLevel: {
      type: Number,
      default: parseInt(process.env.ACCESS_LEVEL_NORMAL_USER),
    },
  },
  {
    collection: `users`,
    versionKey: false,
  }
);

module.exports = mongoose.model(`users`, usersSchema);
