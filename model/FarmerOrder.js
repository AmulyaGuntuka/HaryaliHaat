const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FarmerOrderSchema = new Schema({
  name: { type: String, required: true },
  item: { type: String, required: true },
  productImage: { type: String, required: true }, // stores the image file name
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true },
  district: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  expireDate: { type: String, required: true },
});

module.exports = mongoose.model("FarmerOrder", FarmerOrderSchema);