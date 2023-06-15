import React, { useEffect } from "react";
import { Box, ThemeProvider } from "@mui/system";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../utils/theme/Theme";
import { useNavigate } from "react-router-dom";
import { DrawerContext } from "../../App";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { api } from "../../api";
import {
  getProfile,
  updatedProfile,
  updateProfile,
} from "../../redux/reducers/AuthSlice";
import { persistor } from "../../redux";

const Account = () => {
  const { open, setOpen } = React.useContext(DrawerContext);
  const close = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");

  const token = useSelector((state) => state?.auth?.userData?.data?.token);
  const profile = useSelector((state) => state?.auth?.profileData);
  // console.log("profile", profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile?.data?.data) {
      setProfileData({ ...profile?.data?.data });
    }
  }, []);

  // console.log("profileData", profileData);
  useEffect(() => {
    dispatch(getProfile({ token: token }));
  }, [dispatch]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // setProfileData({ ...profileData, profileImage: file });
  };
  console.log("profileData", profileData);
  const handleUpdate = async () => {
    dispatch(
      updatedProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        token: token,
      })
    );
    // const response = await api.profile.patch({
    //   firstname: profile?.data?.data,
    //   lastName: profile?.data?.data,
    //   token: token,
    // });
    //  dispatch(updateProfile());
    // console.log("updateresponse", response);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            maxWidth="sm"
            sx={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              height: "77vh",
              width: "-webkit-fill-available",
              boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
              width: open && close ? `calc(100% - ${"240px"})` : "100%",
              marginLeft: open && close ? `${"250px"}` : 0,
              mt: 5,
            }}
          >
            <label htmlFor="avatar-input">
              <Button
                variant="outlined"
                // color="#757575"
                component="span"
                sx={{ marginBottom: "7px" }}
                style={{
                  backgroundColor: "#757575",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#555555",
                  },
                }}
              >
                Choose File
              </Button>
            </label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
              id="avatar-input"
            />
            <Typography variant="body2" gutterBottom>
              {selectedFile ? selectedFile.name : "No file selected"}
            </Typography>
            <Avatar
              alt="User Avatar"
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : "/path/to/default-avatar.jpg"
              }
              sx={{
                width: "100px",
                height: "100px",
                margin: "0 auto",
                marginBottom: "16px",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              Your Profile
            </Typography>
            <TextField
              label="First Name"
              variant="outlined"
              color="secondary"
              sx={{ margin: "8px" }}
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              variant="outlined"
              color="secondary"
              sx={{ margin: "8px" }}
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              color="secondary"
              sx={{ margin: "8px" }}
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              disabled
            />
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
                mt: 1,
              }}
            ></Grid>
            <Button
              variant="contained"
              // color="secondary"
              onClick={handleUpdate}
              style={{
                backgroundColor: "#757575",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#555555",
                },
              }}
              sx={{ marginTop: "16px", mb: "10px" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Account;
