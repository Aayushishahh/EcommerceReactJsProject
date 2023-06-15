import { Box, Grid, List, ListItemText, Typography } from "@mui/material";
import React from "react";
import { DrawerContext } from "../App";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const { open, setOpen } = React.useContext(DrawerContext);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#333",
          color: "white",
          width: open ? `calc(100% - ${"240px"})` : "100%",
          marginLeft: open ? `${"240px"}` : 0,
          pt: 5,

          fontSize: "14px",
        }}
      >
        <Grid container spacing={2} sx={{ ml: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              About Us
            </Typography>
            <Typography>
              We served the best quality products.In case of anyquery you can
              message or call the customer care services.Hope you enjoy shopping
              here!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5">Information</Typography>
            <List>
              <ListItemText>
                <Typography variant="caption2">About Us</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="caption2">Contact</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="caption2">Terms & Condition</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="caption2">Privacy & Policy</Typography>
              </ListItemText>
            </List>
            <Box
              sx={{
                mt: 3,
              }}
            >
              <FacebookSharpIcon color="primary" sx={{ mr: 1 }} />
              <TwitterIcon color="primary" sx={{ mr: 1 }} />
              <InstagramIcon color="primary" />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5">My Account</Typography>
            <List>
              <ListItemText>
                <Typography variant="caption2">Login</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="caption2">My Cart</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="caption2">My Account</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="caption2">Wishlist</Typography>
              </ListItemText>
            </List>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          &copy; 2023 Your Name. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
