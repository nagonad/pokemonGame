import React from "react";
import Button from "@mui/material/Button";
import Loading from "./Loading";
import img from "../images/pokemonGrass.png";
import img2 from "../images/File-01.svg";

export default function LandingPage({ loaded }) {
  return !loaded ? (
    <Loading />
  ) : (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${img})`, // Set the path to your image here
        backgroundSize: "cover", // Adjust the background size as needed
        backgroundRepeat: "no-repeat", // Set the background repeat behavior
        backgroundSize: "100% 100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={img2} width={"500px"} />
      <div
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" href="/selection1v1">
          Play 1V1
        </Button>
        <Button variant="contained" href="/selection3v3">
          Play 3V3
        </Button>
      </div>
    </div>
  );
}
