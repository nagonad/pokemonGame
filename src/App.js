import * as React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import SelectPokemon from "./components/SelectPokemon";
import Fight from "./components/Fight";
import LandingPage from "./components/LandingPage";
import SelectPokemon3v3 from "./components/SelectPokemon3v3";
import Fight3v3 from "./components/Fight3v3";
import Loading from "./components/Loading";

export default function App() {
  const [pokemons, setPokemons] = React.useState([]);

  const [loaded, setLoaded] = React.useState(false);

  const [selectedPoke, setSelectedPoke] = React.useState();

  const [selectedPokeSecond, setSelectedPokeSecond] = React.useState();

  const [selectedPokemons3v3, setSelectedPokemons3v3] = React.useState();

  const fetchPokemons = async () => {
    const response = await axios.get(
      "https://pokemongame-115x.onrender.com/api"
    );
    setLoaded(true);

    setPokemons(response.data);
  };

  React.useEffect(() => {
    fetchPokemons();
  }, []);

  const firstPokeSelect = (event, value) => {
    setSelectedPoke(value);
  };

  const secondPokeSelect = (event, value) => {
    setSelectedPokeSecond(value);
  };

  return (
    <div>
      {!loaded ? (
        <Loading></Loading>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage loaded={loaded} />} />
          <Route
            path="/selection1v1"
            element={
              <SelectPokemon
                pokemons={pokemons}
                firstPokeSelect={firstPokeSelect}
                secondPokeSelect={secondPokeSelect}
                selectedPoke={selectedPoke}
                selectedPokeSecond={selectedPokeSecond}
              />
            }
          />
          <Route
            path="/selection3v3"
            element={
              <SelectPokemon3v3
                selectedPokemons3v3={selectedPokemons3v3}
                setSelectedPokemons3v3={setSelectedPokemons3v3}
                pokemons={pokemons}
              />
            }
          />

          <Route path="/fight" element={<Fight pokemons={pokemons} />} />
          <Route
            path="/fight3v3"
            element={
              <Fight3v3
                pokemons={pokemons}
                selectedPokemons3v3={selectedPokemons3v3}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}
