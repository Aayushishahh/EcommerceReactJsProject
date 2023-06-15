import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { ICONS, IMAGES } from "../../assests";
import { categories } from "../../utils/constant";
import { DrawerContext } from "../../App";
import HomeCard from "./HomeCards";
import ResponsiveGrid from "./HomeCards";
import { Container, Grid, Toolbar } from "@mui/material";
import { api } from "../../api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCards from "./HomeCards";
import { useNavigate } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Home() {
  const navigate = useNavigate();
  const verification = useSelector((state) => state?.auth?.userData?.token);

  const theme = useTheme();
  const { open, setOpen } = React.useContext(DrawerContext);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Toolbar />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundImage: `url(${IMAGES.homepage2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            position: "relative",
            width: open ? `calc(100% - ${"240px"})` : "100%",
            marginLeft: open ? `${"240px"}` : 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              px: 2,
              pb: 5,
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: "#fff", mb: 2, textAlign: "center" }}
            >
              Welcome to Our Ecommerce Store
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "#fff", mb: 4, textAlign: "center" }}
            >
              Shop the latest trends in fashion, home decor, electronics, and
              more.
            </Typography>

            <a href="#productcard">
              <Button
                variant="contained"
                color="primary"
                sx={{ minWidth: "150px" }}
              >
                Shop Now
              </Button>
            </a>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "40px 0",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={IMAGES.shipping}
                    alt="Free Shipping"
                    style={{
                      height: "70px",
                      width: "70px",
                      filter: "invert(100%)",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    Free Shipping
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={IMAGES.money}
                    alt="24 Hours Online"
                    style={{
                      height: "70px",
                      width: "70px",
                      filter: "invert(100%)",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    100% Money back
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={IMAGES.hours}
                    alt="100% Moneyback"
                    style={{
                      height: "70px",
                      width: "70px",
                      filter: "invert(100%)",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    Online support 24/7
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="md" id="categories">
          <Typography
            variant="h4"
            sx={{
              mt: 5,
              mb: 3,
              display: "flex",
              justifyContent: "center ",
              alignItems: "center",
              fontWeight: "bold",
              ml: 10,
            }}
          >
            Top Categories
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 3,
              px: 2,
            }}
          >
            {categories.map((category) => (
              <Box key={category.id} sx={{ mx: 5, my: 2, width: "140px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "50%",
                    overflow: "hidden",
                    height: "140px",
                    width: "140px",
                    objectFit: "cover",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Link to={category.path}>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </Link>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#333",
                      mt: 1,
                      mb: 0,
                      display: "flex",
                      justifyContent: "center ",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>

        <ProductCards id="productcard" />
      </Box>
    </>
  );
}

export default Home;
