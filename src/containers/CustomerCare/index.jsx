import * as React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Toolbar,
  Button,
  TextField,
} from "@mui/material";
import { IMAGES } from "../../assests";
import { DrawerContext } from "../../App";

const CustomerCare = () => {
  const { open, setOpen } = React.useContext(DrawerContext);
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          py: 8,
          // backgroundColor: "#f7f7f7",
          width: open ? `calc(100% - ${"240px"})` : "100%",
          marginLeft: open ? `${"240px"}` : 0,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", alignItems: "center" }}  
            >
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Need Help?
                </Typography>
                {/* <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  Customer Care Form
                </Typography> */}
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Our customer support team is available 24/7 to assist you with
                  any questions or issues you may have.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Contact us by phone or email, or chat with a representative
                  online.
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Contact Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Phone: +91 9876543212
                </Typography>
                <Typography variant="body1">
                  Email: aayushi@gmail.com
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, mt: 5, fontWeight: "bold" }}
                >
                  Chat With Us
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Chat with a customer support representative online for
                  immediate assistance.
                </Typography>
                <Box sx={{ maxWidth: 400, mx: "auto" }}>
                  <img
                    src={IMAGES.CustomerCare}
                    alt="Chat With Us"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Send us a message
                </Typography>
                <form>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#757575",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#555555",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CustomerCare;
