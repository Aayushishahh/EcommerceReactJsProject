import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "../../api";
import { DrawerContext } from "../../App";
import theme from "../../utils/theme/Theme";

function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState({});
  const { formData, setFormData } = useContext(DrawerContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("token"));

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
      //   const siteUrl = "http://localhost:3000/forgotpassword";
      const data = await api.auth.resetpassword({
        password: formData.password,
        token: searchParams.get("token"),
        // email:formData.email,
        // siteurl: siteUrl,
      });
      navigate("/login");
      console.log("reset", data);
    } catch (error) {
      console.log("reseterror", error);
    }
  };

  const Validateform = (values) => {
    let errors = {};
    const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;

    if (values.password === "") {
      errors.password = "Password is required";
    } else if (values.password.length < 10) {
      errors.password = "Password must be at least 10 characters long.";
    } else if (!pwdRegex.test(values.password)) {
      errors.password = "Invalid password";
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
            <Typography
              variant="h5"
              align="center"
              sx={{ marginBottom: "24px" }}
            >
              Reset Password
            </Typography>

            <TextField
              label="Password"
              variant="outlined"
              color="secondary"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              error={!!errorMessage.password}
              helperText={errorMessage.password}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              color="secondary"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              fullWidth
              error={!!errorMessage.password}
              helperText={errorMessage.password}
              sx={{ marginBottom: "16px" }}
            />

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default ResetPassword;
