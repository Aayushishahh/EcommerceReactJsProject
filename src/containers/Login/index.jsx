import React from "react";
import { Box, ThemeProvider } from "@mui/system";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import theme from "../../utils/theme/Theme";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assests";
import { useState } from "react";
import { DrawerContext } from "../../App";
import { useContext } from "react";
import { api } from "../../api";
import { useSnackbar } from "notistack";
import SimpleBackdrop from "../../components/Loader";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/AuthSlice";
import { setHeaderToken } from "../../api/client";

function Login() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(DrawerContext);
  const [errorMessage, setErrorMessage] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("formData:::>", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(Validateform(formData));
    try {
      const data = await api.auth.login(formData);
      console.log("datalogin", data);
      dispatch(login(data.data));
      setHeaderToken(data.token);
      console.log(data);
      enqueueSnackbar("Login Successful", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Authentication Failed", { variant: "error" });
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
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format!";
    }

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
      {/* <SimpleBackdrop/> */}
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            // background: "linear-gradient(45deg, #e0e0e0 30%, #ffffff 90%)",
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
              Login
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
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              color="secondary"
              fullWidth
              error={!!errorMessage.password}
              helperText={errorMessage.password}
              sx={{ marginBottom: "16px" }}
            />
            <Link
              href="#"
              variant="body2"
              sx={{ marginBottom: "16px", display: "block" }}
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot password?
            </Link>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: "16px" }}
            >
              <Grid item>
                <Link
                  href="/signUp"
                  variant="body2"
                  onClick={() => navigate("/signup")}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Login;
