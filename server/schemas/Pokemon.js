const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.Mixed,
  type: [String],
  base: mongoose.Schema.Types.Mixed,
  imageUrl: String,
  backImageUrl: String,
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
