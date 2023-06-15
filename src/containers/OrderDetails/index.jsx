import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ICONS } from "../../assests";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Toolbar,
  Container,
  MenuItem,
  Select,
  TextField,
  Divider,
} from "@mui/material";
import { DrawerContext } from "../../App";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { api } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { addCart, addToCart } from "../../redux/reducers/CartSlice";
import { getProductById, updatecart } from "../../redux/reducers/ProductSlice";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import Loader from "../../components/Loader";
export default function NewProductDetails() {
  const navigate = useNavigate();
  const { open, setOpen } = React.useContext(DrawerContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(1);
  const [newProduct, setNewProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { cartdata, setCartdata } = useContext(DrawerContext);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.userData?.data?.token);
  const details = useSelector((state) => state?.product);
  const location = useLocation();

  useEffect(() => {
    dispatch(getProductById(location?.state?.id));
  }, [dispatch]);
  // console.log("isLoading", isLoading);
  const handleClick = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  };

  const handleAdd = async () => {
    setIsLoading(true); // Set loading to true before API call

    try {
      const Items = {
        ...newProduct,
        qty: count,
        totalPrice: newProduct?.price * count,
      };

      const index = cartdata.length
        ? cartdata.findIndex((data) => data.id === Items.id)
        : 0;

      if (index < 0) {
        let index = cartdata.length;
        const updateddata = [...cartdata];
        updateddata[index] = Items;

        setCartdata(updateddata);
      } else {
        const updateddata = [...cartdata];
        updateddata[index] = Items;
        setCartdata(updateddata);
      }

      await dispatch(
        addCart({ product_id: location?.state?.id, token: token })
      );
      navigate("/newcart");
    } catch (error) {
      console.log("Error adding to cart:", error);
      enqueueSnackbar("Failed to add item to cart", { variant: "error" });
    } finally {
      setIsLoading(false); // Set loading to false after API call (whether success or error)
    }
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ minHeight: "100vh" }}>
        <Card
          maxWidth={false}
          sx={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // boxShadow: "41px 5px 39px 0px rgba(0,0.1,0,0.2)",
            width: open ? `calc(70% - ${"240px"})` : "70%",
            marginLeft: open ? `${"245px"}` : 0,
            margin: "auto",
            mt: 2,
            mb: 2,
            minHeight: "100vh",
            //  maxWidth:'100vh',
          }}
        >
          <IconButton>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{ mt: 2, color: "black" }}
            >
              <ICONS.back />
            </Button>
          </IconButton>
          <Grid container spacing={2} sx={{ height: "600px" }}>
            <Grid item sx={{ maxWidth: "50%", minWidth: "50%" }}>
              <CardMedia
                component="img"
                image={`https://ecommerce-server-le5a.onrender.com/${details?.productdetails?.image}`}
                sx={{
                  height: "80%",
                  width: "90%",
                  objectFit: "contain",
                  mt: 2,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ marginBottom: "16px", fontWeight: "bold" }}
                  >
                    {details?.productdetails?.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <ICONS.star
                        key={index}
                        sx={{ color: "#FFD700", fontSize: "16px" }}
                      />
                    ))}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="span"
                      sx={{ marginLeft: "8px" }}
                    >
                      4.5
                    </Typography>
                  </Box>
                  <IconButton onClick={handleClick}>
                    {isFavorite ? (
                      <ICONS.favourite sx={{ color: "red" }} />
                    ) : (
                      <ICONS.favouriteborder sx={{ color: "black" }} />
                    )}
                  </IconButton>
                </Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ marginBottom: "16px", fontWeight: "bold" }}
                >
                  {"₹"}
                  {details?.productdetails?.price}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ marginBottom: "1px" }}
                >
                  {"Category:"}
                  <span style={{ fontWeight: "bold" }}>
                    {details?.productdetails?.category}
                  </span>
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ marginBottom: "16px" }}
                >
                  {"Availibility:"}
                  {details?.productdetails?.stock}
                </Typography>
                <Divider sx={{ marginBottom: "16px" }} />

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ marginBottom: "16px" }}
                >
                  {details?.productdetails?.desc}
                </Typography>

                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => handleAdd(details?.productdetails?.id)}
                    style={{
                      backgroundColor: "#757575",
                      color: "#ffffff",
                      minWidth: "150px",
                      minHeight: "48px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "#555555",
                      },
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader size={20} /> : "Add to Cart"}
                  </Button>
                </CardActions>
                <div
                  style={{
                    marginTop: "16px",
                    marginLeft: "10px",
                  }}
                >
                  <Facebook style={{ marginRight: "8px" }} />
                  <Twitter style={{ marginRight: "8px" }} />
                  <Instagram />
                </div>
                {/* {isLoading && <Loader />} */}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
