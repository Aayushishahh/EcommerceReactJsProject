import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";
import Footer from "./Footer";

function MainLayout() {
  return (
    <>
      <Box sx={{ overflowX: "hidden" }}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}

export default MainLayout;
