import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import _ from "lodash";
import { Link } from "react-router-dom";

const theme2 = createTheme({
  typography: {
    fontFamily: "poke",
    fontSize: 11,
  },
});

export default function SelectPokemon3v3({
  setBgColor,
  selectedPokemons3v3,
  setSelectedPokemons3v3,
  pokemons,
}) {
  const [clicked, setClicked] = React.useState([3, 3]);

  const handleClick = (index, player) => {
    if (clicked[player] > 0) {
      setClicked((prev) => {
        let newClicked = [...prev];
        newClicked[player] = prev[player] - 1;
        return newClicked;
      });
      setSelectedPokemons3v3((prev) => {
        let newArr = [...prev];
        newArr[index] = _.sample(pokemons);
        return newArr;
      });
    }
  };

  React.useEffect(() => {
    setBgColor(true);
  }, []);

  React.useEffect(() => {
    setSelectedPokemons3v3(
      pokemons.sort(() => 0.5 - Math.random()).slice(0, 6)
    );
  }, [pokemons]);

  return (
    <ThemeProvider theme={theme2}>
      <div className="outherContainer3v3">
        <Link to="/fight3v3">
          <Button variant="contained">Fight!</Button>
        </Link>
        <div className="contentContainer3v3">
          <div className="playerContainer3v3">
            <Button variant="outlined">Player 1</Button>
            <div className="pokeContainer3v3">
              {selectedPokemons3v3?.slice(0, 3).map((poke, index) => (
                <div className="iconContainer3v3" key={poke._id}>
                  <IconButton
                    onClick={() => {
                      handleClick(index, 0);
                    }}
                  >
                    <ReplayCircleFilledIcon
                      fontSize="large"
                      color={clicked[0] < 1 ? "disabled" : "primary"}
                    />
                  </IconButton>
                  <div className="imgContainer3v3">
                    <img src={poke.imageUrl} width={"120px"} />
                  </div>
                  <Typography textAlign={"center"}>
                    {poke.name.english}
                  </Typography>
                  <div>{renderTable(poke)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="playerContainer3v3">
            <Button variant="outlined">Player 2</Button>
            <div className="pokeContainer3v3">
              {selectedPokemons3v3?.slice(3, 6).map((poke, index) => (
                <div className="iconContainer3v3" key={poke._id}>
                  <IconButton
                    onClick={() => {
                      handleClick(index + 3, 1);
                    }}
                  >
                    <ReplayCircleFilledIcon
                      fontSize="large"
                      color={clicked[1] < 1 ? "disabled" : "primary"}
                    />
                  </IconButton>
                  <div>
                    <img src={poke.imageUrl} width={"120px"} />
                  </div>
                  <Typography textAlign={"center"}>
                    {poke.name.english}
                  </Typography>
                  <div>{renderTable(poke)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

const renderTable = (selectedPoke) => {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell sx={{ padding: "0.5rem 1rem" }}>HP</TableCell>
          <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
            {selectedPoke.base.HP}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ padding: "0.5rem 1rem" }}>Attack</TableCell>
          <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
            {selectedPoke.base.Attack}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ padding: "0.5rem 1rem" }}>Defense</TableCell>
          <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
            {selectedPoke.base.Defense}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ padding: "0.5rem 1rem" }}>SP Attack</TableCell>
          <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
            {selectedPoke.base.SpAttack}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ padding: "0.5rem 1rem" }}>SP Defense</TableCell>
          <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
            {selectedPoke.base.SpDefense}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ padding: "0.5rem 1rem" }}>Speed</TableCell>
          <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
            {selectedPoke.base.Speed}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
