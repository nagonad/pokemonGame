import * as React from "react";
import { Typography } from "@mui/material";

const Loading = () => {
  const [dots, setDots] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500); // Adjust the interval duration as needed

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("https://images3.alphacoders.com/273/273289.jpg")`, // Set the path to your image here
        backgroundSize: "cover", // Adjust the background size as needed
        backgroundRepeat: "no-repeat", // Set the background repeat behavior
        backgroundSize: "100% 100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "600px" }}>
        <Typography sx={{ color: "white" }}>Loading{dots}</Typography>
        <Typography sx={{ color: "white" }}>
          Please wait. It will take around 30 seconds this website to recover
          itself!
        </Typography>
      </div>
    </div>
  );
};

export default Loading;
