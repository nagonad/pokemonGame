import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function SelectPokemon({
  setBgColor,
  pokemons,
  firstPokeSelect,
  selectedPokeSecond,
  secondPokeSelect,
  selectedPoke,
}) {
  React.useEffect(() => {
    setBgColor(true);
  }, []);
  return (
    <div className="outherContainer">
      <div>
        <Button
          href={
            selectedPoke &&
            selectedPokeSecond &&
            `/fight?firstPoke=${selectedPoke._id}&&secondPoke=${selectedPokeSecond._id}`
          }
          variant="contained"
        >
          Fight!
        </Button>
        <hr />
      </div>
      <div className="baseContainer">
        <Stack spacing={2} sx={{ width: 300, margin: "0.5rem" }}>
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => option.name.english}
            onChange={(e, value) => {
              firstPokeSelect(e, value);
            }}
            options={pokemons}
            renderInput={(params) => (
              <TextField {...params} label="Pokemon 1" />
            )}
          />
          {selectedPoke && (
            <div className="app-poke-container">
              <div>
                <img src={selectedPoke.imageUrl} alt="" />
              </div>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>HP</TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPoke.base.HP}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        Attack
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPoke.base.Attack}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        Defense
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPoke.base.Defense}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        SP Attack
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPoke.base.SpAttack}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        SP Defense
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPoke.base.SpDefense}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        Speed
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPoke.base.Speed}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </Stack>
        <Stack spacing={2} sx={{ width: 300, margin: "0.5rem" }}>
          <Autocomplete
            freeSolo
            getOptionLabel={(option) => option.name.english}
            onChange={(e, value) => {
              secondPokeSelect(e, value);
            }}
            options={pokemons}
            renderInput={(params) => (
              <TextField {...params} label="Pokemon 2" />
            )}
          />
          {selectedPokeSecond && (
            <div className="app-poke-container">
              <div>
                <img src={selectedPokeSecond.imageUrl} alt="" />
              </div>
              <div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>HP</TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPokeSecond.base.HP}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        Attack
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPokeSecond.base.Attack}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        Defense
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPokeSecond.base.Defense}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        SP Attack
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPokeSecond.base.SpAttack}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        SP Defense
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPokeSecond.base.SpDefense}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ padding: "0.5rem 1rem" }}>
                        Speed
                      </TableCell>
                      <TableCell sx={{ padding: "0.5rem 1rem" }} align="right">
                        {selectedPokeSecond.base.Speed}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
}
