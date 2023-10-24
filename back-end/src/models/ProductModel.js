const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    params_name: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 1 },
    rating: { type: Number, default: 1 },
    countInStock: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

productSchema.index({ params_name: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
