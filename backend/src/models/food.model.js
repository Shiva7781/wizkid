const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    ingredients: { type: Array, require: true },
    recipe: { type: Array, require: true },
    userID: { type: String },
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Food", foodSchema);
