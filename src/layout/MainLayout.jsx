import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function MainLayout() {
  const token = useSelector((state) => state?.auth?.userData?.data?.token);

  const NavigatePerUser = () => {
    if (token) {
      return <Outlet />;
    } else {
      return <Navigate to={"/login"} />;
    }
  };
  return (
    <>
      <Box sx={{ overflowX: "hidden" }}>
        <Header />
       {NavigatePerUser()}
        <Footer />
      </Box>
    </>
  );
}

export default MainLayout;
