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
    <div>
      <div style={{ width: "600px" }}>
        <Typography sx={{ color: "white" }}>Loading{dots}</Typography>
        <Typography sx={{ color: "white" }}>
          Please wait. It will take around 30 seconds for this website to
          recover itself!
        </Typography>
      </div>
    </div>
  );
};

export default Loading;
