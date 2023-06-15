import { useMediaQuery } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
// import { useTheme } from "styled-components";
import MainLayout from "./layout/MainLayout";
import Header from "./layout/Header";
import Routing from "./routes";
import { useTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

export const DrawerContext = createContext();

function App(props) {
  const theme = useTheme();
  const close = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(close);
  const [cartdata, setCartdata] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setOpen(close);
  }, [close]);

  return (
    <SnackbarProvider
      maxSnack={3}
       autoHideDuration={2000}
      // anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <DrawerContext.Provider
        value={{ open, setOpen, cartdata, setCartdata, formData, setFormData }}
      >
        {props.children}
        <Routing />
      </DrawerContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
