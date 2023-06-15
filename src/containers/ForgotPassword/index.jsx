import { Box, Button, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { api } from "../../api";
import { DrawerContext } from "../../App";
import theme from "../../utils/theme/Theme";

function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState({});
  const { formData, setFormData } = useContext(DrawerContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage((prevErrors) => {
      return { ...prevErrors, [name]: undefined };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const siteUrl = "http://localhost:3000/resetpassword/token";
      const data = await api.auth.forgotpassword({
        email:formData.email,
        siteurl: siteUrl,
      });
      console.log("forgot", data);
    } catch (error) {
      console.log("forgoterror", error);
    }
  };

  const Validateform = (values) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.email === "") {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format!";
    }
    setErrorMessage(errors);
    return errors;
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          //   background: "linear-gradient(45deg, #e0e0e0 30%, #ffffff 90%)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            maxWidth: "400px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" align="center" sx={{ marginBottom: "24px" }}>
            Forgot Password
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            color="secondary"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errorMessage.email}
            helperText={errorMessage.email}
            sx={{ marginBottom: "16px" }}
          />

          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Forgot Password
          </Button>
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
}

export default ForgotPassword;
