const {
  createPokemon,
  resetServer,
  getAllPokemons,
  saveResult,
} = require("../controllers/pokemon");

const express = require("express");

const api = express.Router();

api.route("/").post(createPokemon).get(getAllPokemons);

api.route("/recordResult").post(saveResult);

api.route("/resetServer").get(resetServer);

module.exports = api;
