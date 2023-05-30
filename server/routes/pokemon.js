const {
  createPokemon,
  resetServer,
  getAllPokemons,
} = require("../controllers/pokemon");

const express = require("express");

const api = express.Router();

api.route("/").post(createPokemon).get(getAllPokemons);

api.route("/resetServer").get(resetServer);

module.exports = api;
