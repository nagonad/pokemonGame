import React from "react";
import Button from "@mui/material/Button";
import Loading from "./Loading";
import { ReactComponent as Logo } from "../images/File-01.svg";

export default function LandingPage({ loaded }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Logo style={{ width: "500px", height: "auto" }} fill="white" />
      <div
        style={{
          width: "500px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
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
