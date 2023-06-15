import React, { useContext } from "react";
import { Box, ThemeProvider } from "@mui/system";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import theme from "../../utils/theme/Theme";
import { IMAGES } from "../../assests";
import { DrawerContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api";
import { useSnackbar } from "notistack";
import SimpleBackdrop from "../../components/Loader";

function SignUp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(DrawerContext);
  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validateform(formData);
    setErrorMessage(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await api.auth.register(formData);
        enqueueSnackbar("SignUp Successfull", { variant: "success" });
        navigate("/login");
      } catch (error) {
        enqueueSnackbar("Authentication Failed", { variant: "error" });
      }
      setFormData("");
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage((prevErrors) => {
      return { ...prevErrors, [name]: undefined };
    });
  };

  const Validateform = (values) => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/;

    if (values.email === "") {
      errors.email = "email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (values.password === "") {
      errors.password = "password is required";
    } else if (values.password.length < 10) {
      errors.password = "Password must be at least 10 characters long.";
    } else if (!pwdRegex.test(values.password)) {
      errors.password = "This password is not valid";
    }
    if (values.firstName === "") {
      errors.firstName = "First name is required";
    }
  
    if (values.lastName === "") {
      errors.lastName = "Last name is required";
    }
    setErrorMessage(errors);

    return errors;
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "linear-gradient(45deg, #e0e0e0 30%, #ffffff 90%)",
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
              variant="h4"
              align="center"
              sx={{ marginBottom: "24px" }}
            >
              Sign Up
            </Typography>

            <TextField
              label="FirstName"
              variant="outlined"
              color="secondary"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e)}
              fullWidth
              error={!!errorMessage.firstName}
              helperText={errorMessage.firstName}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              label="LastName"
              variant="outlined"
              color="secondary"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e)}
              fullWidth
              error={!!errorMessage.lastName}
              helperText={errorMessage.lastName}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              color="secondary"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              fullWidth
              error={!!errorMessage.email}
              helperText={errorMessage.email}
              sx={{ marginBottom: "16px" }}
            />
            {/* <Typography style={{ color: "red" }}>
              {errorMessage.email}
            </Typography> */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              color="secondary"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              fullWidth
              error={!!errorMessage.password}
              helperText={errorMessage.password}
              sx={{ marginBottom: "16px" }}
            />
            {/* <Typography style={{ color: "red" }}>
              {errorMessage.password}
            </Typography> */}

            <Button
               variant="contained"
               color="secondary"
               type="submit"
               fullWidth
            >
              SignUp
            </Button>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: "16px" }}
            >
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account ? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default SignUp;
