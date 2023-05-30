import * as React from "react";
import { Divider, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import _ from "lodash";

export default function Winner({ score, selectedPokemons3v3 }) {
  return (
    <div className="winnerBody">
      <div className="textContainer">
        <Typography
          color="primary"
          sx={{
            fontSize: "24px",
            color:
              _.sum(score.firstPoke) < _.sum(score.secondPoke)
                ? "transparent"
                : "#2196f3",
          }}
        >
          {" "}
          Player1 won!
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            color:
              _.sum(score.firstPoke) > _.sum(score.secondPoke)
                ? "transparent"
                : "#2196f3",
          }}
          textAlign={"end"}
        >
          Player2 won!
        </Typography>
      </div>

      <div className="winnerPokeContainer">
        <Card
          sx={{
            width: "150px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            boxShadow:
              score.firstPoke[0] === 1 ? "inset 0 0 8px 0 green" : "inherit",
          }}
        >
          <img
            className="winnerImg"
            src={selectedPokemons3v3[0].imageUrl}
            alt=""
          />
          <Typography>{selectedPokemons3v3[0].name.english}</Typography>
        </Card>
        <Card
          sx={{
            width: "150px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            boxShadow:
              score.secondPoke[0] === 1 ? "inset 0 0 8px 0 green" : "inherit",
          }}
        >
          <img
            className="winnerImg"
            src={selectedPokemons3v3[3].imageUrl}
            alt=""
          />
          <Typography>{selectedPokemons3v3[3].name.english}</Typography>
        </Card>
      </div>
      <div className="winnerPokeContainer">
        <Card
          sx={{
            width: "150px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            boxShadow:
              score.firstPoke[1] === 1 ? "inset 0 0 8px 0 green" : "inherit",
          }}
        >
          <img
            className="winnerImg"
            src={selectedPokemons3v3[1].imageUrl}
            alt=""
          />
          <Typography>{selectedPokemons3v3[1].name.english}</Typography>
        </Card>
        <Card
          sx={{
            width: "150px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            boxShadow:
              score.secondPoke[1] === 1 ? "inset 0 0 8px 0 green" : "inherit",
          }}
        >
          <img
            className="winnerImg"
            src={selectedPokemons3v3[4].imageUrl}
            alt=""
          />
          <Typography>{selectedPokemons3v3[4].name.english}</Typography>
        </Card>
      </div>

      <div className="winnerPokeContainer">
        <Card
          sx={{
            width: "150px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            boxShadow:
              score.firstPoke[2] === 1 ? "inset 0 0 8px 0 green" : "inherit",
          }}
        >
          <img
            className="winnerImg"
            src={selectedPokemons3v3[2].imageUrl}
            alt=""
          />
          <Typography>{selectedPokemons3v3[2].name.english}</Typography>
        </Card>
        <Card
          sx={{
            width: "150px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1rem",
            boxShadow:
              score.secondPoke[2] === 1 ? "inset 0 0 8px 0 green" : "inherit",
          }}
        >
          <img
            className="winnerImg"
            src={selectedPokemons3v3[5].imageUrl}
            alt=""
          />
          <Typography>{selectedPokemons3v3[5].name.english}</Typography>
        </Card>
      </div>
    </div>
  );
}
