import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, Container, Toolbar } from "@mui/material";
import { DrawerContext } from "../../App";
import { IMAGES } from "../../assests";
import Grid from "@mui/material/Grid";

export default function AboutUs() {
  const { open, setOpen } = React.useContext(DrawerContext);
  const theme = useTheme();

  return (
    <>
      <Toolbar />
      <Card
        sx={{
          display: "flex",
          margin: "auto",
          mt: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: open ? `calc(100% - ${"240px"})` : "100%",
            marginLeft: open ? `${"255px"}` : 5,
            minHeight: "100vh",
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={6}>
              <Typography
                component="div"
                variant="h4"
                sx={{ mb: 3, fontFamily: "fantasy" }}
              >
                About Us
              </Typography>
              <Typography
                component="div"
                variant="h3"
                sx={{ fontFamily: "cursive", fontWeight: 600, mb: 3 }}
              >
                See Our fabrics In Action
              </Typography>
              <Typography
                component="div"
                variant="h5"
                sx={{ fontFamily: "cursive", mb: 3 }}
              >
                To understand the care we put into each piece,you have to see it
                in action.
              </Typography>
              <Typography component="div" variant="h6" sx={{ mb: 5 }}>
                We have a painstaking attention to detail,quality and
                construction because we our pieces as a testament to the
                significance of this time.It's the anti "old-shirt"-it's the
                uniform for those who share our belief that Otium is the most
                important time of the day.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={IMAGES.about}
                sx={{
                  height: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}
