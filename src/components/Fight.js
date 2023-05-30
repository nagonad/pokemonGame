import * as React from "react";
import { useLocation } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Fight({ pokemons }) {
  const [phase, setPhase] = React.useState();
  let breakCondition = true;
  const [positionFirstPoke, setPositionFirstPoke] = React.useState({
    x: 0,
    y: 0,
  });
  const [positionSecondPoke, setPositionSecondPoke] = React.useState({
    x: 0,
    y: 0,
  });
  const [firstPoke, setFirstPoke] = React.useState();
  const [secondPoke, setSecondPoke] = React.useState();

  const [firstPokeHP, setFirstPokeHP] = React.useState(100);
  const [secondPokeHP, setSecondPokeHP] = React.useState(100);

  const attackFirstPoke = () => {
    setPositionFirstPoke({ x: 80, y: -80 });

    setTimeout(() => {
      setSecondPokeHP((prev) => {
        let damage = (firstPoke.base.Attack / secondPoke.base.Defense) * 20;
        let relativHP = (prev * secondPoke.base.HP) / 100 - damage;
        if (relativHP < 0) {
          breakCondition = false;
        }
        return (relativHP / secondPoke.base.HP) * 100;
      });

      setPositionFirstPoke({ x: 0, y: 0 });
    }, 300);
  };

  const attackSecondPoke = () => {
    setPositionSecondPoke({ x: -80, y: 80 });

    setTimeout(() => {
      setFirstPokeHP((prev) => {
        let damage = (secondPoke.base.Attack / firstPoke.base.Defense) * 20;
        let relativHP = (prev * firstPoke.base.HP) / 100 - damage;
        if (relativHP < 0) {
          breakCondition = false;
        }
        return (relativHP / firstPoke.base.HP) * 100;
      });

      setPositionSecondPoke({ x: 0, y: 0 });
    }, 300);
  };

  const fight = async () => {
    while (breakCondition) {
      if (breakCondition) {
        if (firstPoke.base.Speed > secondPoke.base.Speed) {
          attackFirstPoke();
        } else {
          attackSecondPoke();
        }
      }

      await delay(1000);
      if (breakCondition) {
        if (firstPoke.base.Speed > secondPoke.base.Speed) {
          attackSecondPoke();
        } else {
          attackFirstPoke();
        }
      }
      await delay(1000);
    }
  };

  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  React.useEffect(() => {
    setFirstPoke(
      pokemons.find((el) => el._id === searchParams.get("firstPoke"))
    );
    setSecondPoke(
      pokemons.find((el) => el._id === searchParams.get("secondPoke"))
    );
  }, [pokemons]);

  React.useEffect(() => {
    if (firstPoke && secondPoke) {
      setTimeout(() => {
        fight();
      }, 1000);
    }
  }, [firstPoke, secondPoke]);

  return (
    <>
      <div className="fightContainer">
        <Box sx={{ width: "200px", position: "absolute", top: 10, left: 10 }}>
          <Typography>{secondPoke?.name.english}</Typography>
          <LinearProgress
            variant="determinate"
            color="warning"
            value={secondPokeHP}
          />
        </Box>
        <Box
          sx={{ width: "200px", position: "absolute", right: 10, bottom: 10 }}
        >
          <Typography>{firstPoke?.name.english}</Typography>
          <LinearProgress
            color="error"
            variant="determinate"
            value={firstPokeHP}
          />
        </Box>
        <img
          src={firstPoke?.backImageUrl}
          style={{
            transform: `translate(${positionFirstPoke.x}px,${positionFirstPoke.y}px)`,
            transition: "transform 0.3s",
            position: "absolute",
            left: 0,
            bottom: 0,
          }}
        />
        <img
          src={secondPoke?.imageUrl}
          style={{
            transform: `translate(${positionSecondPoke.x}px,${positionSecondPoke.y}px)`,
            transition: "transform 0.3s",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        />
      </div>
    </>
  );
}
