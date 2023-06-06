import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import _ from "lodash";
import dmg from "./damageJson.json";

export default function Fight1v1({
  poke1,
  poke2,
  setRound,
  round,
  score,
  setScore,
}) {
  let breakCondition = true;

  const [positionFirstPoke, setPositionFirstPoke] = React.useState({
    x: 0,
    y: 0,
  });
  const [positionSecondPoke, setPositionSecondPoke] = React.useState({
    x: 0,
    y: 0,
  });
  const [firstPokeHP, setFirstPokeHP] = React.useState(100);
  const [secondPokeHP, setSecondPokeHP] = React.useState(100);

  const [damage, setDamage] = React.useState({
    firstPoke: { type: "white", amount: 0, display: "none" },
    secondPoke: { type: "white", amount: 0, display: "none" },
  });

  const missChance = 0.25;
  const spAttackChance = 0.4;
  const critChance = 0.25;
  const rageMultiplier = 2;

  const attackFirstPoke = async () => {
    setPositionFirstPoke({ x: 80, y: -80 });
    let critMultiplier = 1;

    await delay(300);
    if (Math.random() > missChance) {
      if (Math.random() > spAttackChance) {
        if (Math.random() < critChance) {
          critMultiplier = 2;
        }
        let Damage =
          (poke1.base.Attack / poke2.base.Defense) * 10 * critMultiplier + 2;
        setDamage((prev) => {
          let newObj = prev.firstPoke;
          newObj.amount = parseInt(Damage);
          newObj.display = "block";
          if (critMultiplier === 2) {
            newObj.type = "yellow";
          }
          return { ...prev, newObj };
        });
        setSecondPokeHP((prev) => {
          let relativHP = (prev * poke2.base.HP) / 100 - Damage;
          if (relativHP < 0) {
            breakCondition = false;
            setScore((prev) => {
              let newArr = prev.firstPoke;
              newArr[round] = 1;
              return { ...prev, firstPoke: newArr };
            });
            endRound();
          }
          return (relativHP / poke2.base.HP) * 100;
        });
      } else {
        let typeMultiplier = dmg[_.sample(poke1.type)][_.sample(poke2.type)];

        let Damage =
          (poke1.base.SpAttack / poke2.base.Defense) * typeMultiplier * 10 + 2;
        setDamage((prev) => {
          let newObj = prev.firstPoke;
          newObj.amount = parseInt(Damage);
          newObj.display = "block";
          newObj.type = "red";
          return { ...prev, newObj };
        });
        setSecondPokeHP((prev) => {
          let relativHP = (prev * poke2.base.HP) / 100 - Damage;
          if (relativHP < 0) {
            breakCondition = false;
            setScore((prev) => {
              let newArr = prev.firstPoke;
              newArr[round] = 1;
              return { ...prev, firstPoke: newArr };
            });
            endRound();
          }
          return (relativHP / poke2.base.HP) * 100;
        });
      }
    } else {
      setDamage((prev) => {
        let newObj = prev.firstPoke;
        newObj.amount = "Miss";
        newObj.display = "block";
        return { ...prev, newObj };
      });
    }

    setPositionFirstPoke({ x: 0, y: 0 });
    await delay(500);
    setDamage((prev) => {
      let newObj = prev.firstPoke;
      newObj.display = "none";
      newObj.type = "white";
      return { ...prev, newObj };
    });
  };

  const attackSecondPoke = async () => {
    setPositionSecondPoke({ x: -80, y: 80 });
    let critMultiplier = 1;

    await delay(300);
    if (Math.random() > missChance) {
      if (Math.random() > spAttackChance) {
        if (Math.random() < critChance) {
          critMultiplier = 2;
        }
        let Damage =
          (poke2.base.Attack / poke1.base.Defense) * 10 * critMultiplier + 2;
        setDamage((prev) => {
          let newObj = prev.secondPoke;
          newObj.amount = parseInt(Damage);
          newObj.display = "block";
          if (critMultiplier === 2) {
            newObj.type = "yellow";
          }
          return { ...prev, newObj };
        });

        setFirstPokeHP((prev) => {
          let relativHP = (prev * poke1.base.HP) / 100 - Damage;
          if (relativHP < 0) {
            breakCondition = false;
            setScore((prev) => {
              let newArr = prev.secondPoke;
              newArr[round] = 1;
              return { ...prev, secondPoke: newArr };
            });
            endRound();
          }
          return (relativHP / poke1.base.HP) * 100;
        });
      } else {
        let typeMultiplier = dmg[_.sample(poke2.type)][_.sample(poke1.type)];

        let Damage =
          (poke2.base.SpAttack / poke1.base.SpDefense) * typeMultiplier * 10 +
          2;
        setDamage((prev) => {
          let newObj = prev.secondPoke;
          newObj.amount = parseInt(Damage);
          newObj.display = "block";
          newObj.type = "red";
          return { ...prev, newObj };
        });

        setFirstPokeHP((prev) => {
          let relativHP = (prev * poke1.base.HP) / 100 - Damage;
          if (relativHP < 0) {
            breakCondition = false;
            setScore((prev) => {
              let newArr = prev.secondPoke;
              newArr[round] = 1;
              return { ...prev, secondPoke: newArr };
            });
            endRound();
          }
          return (relativHP / poke1.base.HP) * 100;
        });
      }
    } else {
      setDamage((prev) => {
        let newObj = prev.secondPoke;
        newObj.amount = "Miss";
        newObj.display = "block";
        return { ...prev, newObj };
      });
    }

    setPositionSecondPoke({ x: 0, y: 0 });
    await delay(500);
    setDamage((prev) => {
      let newObj = prev.secondPoke;
      newObj.display = "none";
      newObj.type = "white";
      return { ...prev, newObj };
    });
  };

  const fight = async () => {
    await delay(2000);
    while (breakCondition) {
      if (breakCondition) {
        if (poke1.base.Speed > poke2.base.Speed) {
          attackFirstPoke();
        } else {
          attackSecondPoke();
        }
      }

      await delay(1000);
      if (breakCondition) {
        if (poke1.base.Speed > poke2.base.Speed) {
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

  const endRound = async () => {
    await delay(1300);

    setRound((prev) => prev + 1);
  };

  React.useEffect(() => {
    fight();
  }, []);

  return (
    <div
      style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
    >
      <div className="fightContainer">
        <Box sx={{ width: "200px", position: "absolute", top: 10, left: 10 }}>
          <div className="barContainer">
            <div className="singleBarContainer">
              <div
                style={{
                  borderColor:
                    _.sum(score.secondPoke) > 0 ? "yellow" : "transparent",
                }}
                className="bar"
              ></div>
            </div>
            <div className="singleBarContainer">
              <div
                className="bar"
                style={{
                  borderColor:
                    _.sum(score.secondPoke) > 1 ? "yellow" : "transparent",
                }}
              ></div>
            </div>
            <div className="singleBarContainer">
              <div
                className="bar"
                style={{
                  borderColor:
                    _.sum(score.secondPoke) > 2 ? "yellow" : "transparent",
                }}
              ></div>
            </div>
          </div>
          <Typography>{poke2?.name.english}</Typography>
          <LinearProgress
            variant="determinate"
            color="warning"
            value={secondPokeHP}
          />
        </Box>
        <Box
          sx={{ width: "200px", position: "absolute", right: 10, bottom: 10 }}
        >
          <div className="barContainer">
            <div className="singleBarContainer">
              <div
                className="bar"
                style={{
                  borderColor:
                    _.sum(score.firstPoke) > 0 ? "yellow" : "transparent",
                }}
              ></div>
            </div>
            <div className="singleBarContainer">
              <div
                className="bar"
                style={{
                  borderColor:
                    _.sum(score.firstPoke) > 1 ? "yellow" : "transparent",
                }}
              ></div>
            </div>
            <div className="singleBarContainer">
              <div
                className="bar"
                style={{
                  borderColor:
                    _.sum(score.firstPoke) > 2 ? "yellow" : "transparent",
                }}
              ></div>
            </div>
          </div>
          <Typography>{poke1?.name.english}</Typography>
          <LinearProgress
            color="error"
            variant="determinate"
            value={firstPokeHP}
          />
        </Box>
        <div className="imgContainer1v1" style={{ left: 0, bottom: 0 }}>
          <img
            alt={poke1.name.english}
            src={poke1?.backImageUrl}
            style={{
              transform: `translate(${positionFirstPoke.x}px,${positionFirstPoke.y}px)`,
              transition: "transform 0.3s",
            }}
          />
          <Typography
            sx={{
              fontSize: "36px",
              display: damage.secondPoke.display,
              color: damage.secondPoke.type,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              marginX: "auto",
              width: "0px",
              textShadow: `-3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 3px 3px 0 black`,
            }}
          >
            {damage.secondPoke.amount}
          </Typography>
        </div>
        <div className="imgContainer1v1" style={{ right: 0, top: 0 }}>
          <img
            alt={poke2.name.english}
            src={poke2?.imageUrl}
            style={{
              transform: `translate(${positionSecondPoke.x}px,${positionSecondPoke.y}px)`,
              transition: "transform 0.3s",
            }}
          />
          <Typography
            sx={{
              fontSize: "36px",
              display: damage.firstPoke.display,
              color: damage.firstPoke.type,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              marginX: "auto",
              width: "0px",
              textShadow: `-3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 3px 3px 0 black`,
            }}
          >
            {damage.firstPoke.amount}
          </Typography>
        </div>
      </div>
    </div>
  );
}
