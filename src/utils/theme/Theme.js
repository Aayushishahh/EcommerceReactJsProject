import * as React from "react";
import { createTheme } from "@mui/material/styles";
import {   grey, pink, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: grey[800],
    },
  },
});
export default theme;
