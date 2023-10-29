const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    miin: 0,
  },
  category: {
    type: String,
    enum: ["vegetable", "dairy", "fruit"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
