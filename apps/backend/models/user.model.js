const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, hash passwords!
  role: { 
    type: String, 
    enum: ["super_admin", "admin", "employee"], 
    default: "employee" 
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);