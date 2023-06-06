const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.Mixed,
  type: [String],
  base: mongoose.Schema.Types.Mixed,
  imageUrl: String,
  backImageUrl: String,
  matches: Number,
  wins: Number,
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
