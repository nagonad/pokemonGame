const Pokemon = require("../schemas/Pokemon");
const poke = require("../poke.json");

const createPokemon = async (req, res) => {
  try {
    const { name, type, base, imageUrl, backImageUrl } = req.body;
    const pokemon = await Pokemon.create({
      name,
      type,
      base,
      imageUrl,
      backImageUrl,
    });

    res.status(200).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getAllPokemons = async (req, res) => {
  try {
    const pokemon = await Pokemon.find();

    res.status(200).json(pokemon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const resetServer = async (req, res) => {
  try {
    const deneme = await Pokemon.deleteMany();
    if (deneme.acknowledged) {
      poke.forEach((el) => {
        const base = el.base;
        const newBase = {
          Attack: base.Attack,
          Defense: base.Defense,
          HP: base.HP,
          Speed: base.Speed,
          SpAttack: base["Sp. Attack"],
          SpDefense: base["Sp. Defense"],
        };
        el.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.id}.png`;
        el.backImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${el.id}.png`;
        el.base = newBase;
        el.matches = 0;
        el.wins = 0;
      });

      const pokemon = await Pokemon.insertMany(poke);

      res.status(200).json(pokemon);
    } else {
      res.send("Something went wrong with deleting all data");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const saveResult = async (req, res) => {
  const updates = [
    {
      updateMany: {
        filter: { _id: { $in: req.body.match } },
        update: { $inc: { matches: +1 } },
      },
    },
    {
      updateMany: {
        filter: { _id: { $in: req.body.winner } },
        update: { $inc: { wins: +1 } },
      },
    },
  ];
  try {
    const resp = await Pokemon.bulkWrite(updates);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { createPokemon, resetServer, getAllPokemons, saveResult };
