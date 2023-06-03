import * as React from "react";
import Fight1v1 from "./Fight1v1";
import Winner from "./Winner";
import { truncate } from "lodash";

export default function Fight3v3({ selectedPokemons3v3 }) {
  const [round, setRound] = React.useState(0);
  const [score, setScore] = React.useState({
    firstPoke: [0, 0, 0],
    secondPoke: [0, 0, 0],
  });

  return (
    <>
      {round === 0 && (
        <Fight1v1
          score={score}
          setScore={setScore}
          round={round}
          poke1={selectedPokemons3v3[0]}
          poke2={selectedPokemons3v3[3]}
          setRound={setRound}
        />
      )}
      {round === 1 && (
        <Fight1v1
          score={score}
          setScore={setScore}
          round={round}
          poke1={selectedPokemons3v3[1]}
          poke2={selectedPokemons3v3[4]}
          setRound={setRound}
        />
      )}
      {round === 2 && (
        <Fight1v1
          score={score}
          setScore={setScore}
          round={round}
          poke1={selectedPokemons3v3[2]}
          poke2={selectedPokemons3v3[5]}
          setRound={setRound}
        />
      )}
      {round === 3 && (
        <Winner selectedPokemons3v3={selectedPokemons3v3} score={score} />
      )}
    </>
  );
}
