const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
  userRole: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, unique: true, required: true }, // Unique email
  district: { type: String, required: true },
  password: { type: String, required: true },
  primaryKey: { type: String, unique: true, required: true }, // Primary key (email + role)
});

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;