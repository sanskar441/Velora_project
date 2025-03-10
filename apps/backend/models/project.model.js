const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);