import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import Main from "./components/Main";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#007e44"
    },
    primary: {
      main: "#00b06a"
    }
  },
  typography: {
    fontFamily: ["\"Source Sans Pro\"", "serif", "sans-serif"].join(",")
  }
});

export default () => (
  <div>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </div>
);
