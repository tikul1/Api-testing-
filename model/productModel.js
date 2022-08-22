const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: String,
    productCatagory: String,
    productPrice: Number,
    productQuantity: Number,
    productSold: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
