const mongoose = require('mongoose');  // Import mongoose

// Define the schema for the product model
const productSchema = new mongoose.Schema({
  name: String,
  item: String,
  productImage: String,
  category: String,
  quantity: Number,
  price: Number,
  district: String,
  mobile: String,
  address: String,
  expireDate: Date,
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
  postedDate: { type: Date, default: Date.now }
});

// Create the Product model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
  