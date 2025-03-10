const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["initial", "in progress", "completed"], default: "initial" },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);