const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 5000;
const poke = require("./poke.json");
const cors = require("cors");
const axios = require("axios");
const connectDB = require("./db");
const pokemon = require("./routes/pokemon");

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

connectDB();

app.use(cors());

app.use("/api", pokemon);

// app.get("/pokemon", (req, res) => {
//   res.send(poke);
// });

// app.get("/pokemon/:id", (req, res) => {
//   const { id } = req.params;
//   const pokemon = poke.find((el) => el.id == id);
//   res.send(pokemon);
// });

app.listen(PORT, () => console.log("server is running at port " + PORT));
