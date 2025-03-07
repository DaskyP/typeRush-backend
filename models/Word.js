const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  mode: { type: String, enum: ["words", "quotes", "time"], required: true },
  hasPunctuation: { type: Boolean, default: false },
  hasAccent: { type: Boolean, default: false },
  hasNumbers: { type: Boolean, default: false },
  length: { type: Number, required: true },
});

const Word = mongoose.model("Word", wordSchema);
module.exports = Word;
