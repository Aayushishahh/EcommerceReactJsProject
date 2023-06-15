import * as React from "react";

import { getProductByCategory } from "../../redux/reducers/ProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../../components/card";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DrawerContext } from "../../App";
import { ICONS } from "../../assests";
import { BounceLoader } from "react-spinners";
import { useState } from "react";

const ProductCategory = ({ category }) => {
  const navigate = useNavigate();
  const { open, setOpen } = React.useContext(DrawerContext);

  console.log("category", category);
  const dispatch = useDispatch();
  const productsection = useSelector(
    (state) => state?.product?.category?.product
  );
  console.log("productsection", productsection);

  const categorysection = useSelector((state) => state?.product?.category);
  console.log("categorysection", categorysection);

  useEffect(() => {
    dispatch(getProductByCategory(category));
  }, [category]);

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          flexGrow: 1,
          mt: 2,
          width: open ? `calc(100% - ${"240px"})` : "100%",
          marginLeft: open ? `${"250px"}` : 0,
          minHeight: "100vh",
          //  position:'relative'
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{ mt: 2, color: "black" }}
            >
              {/* Back */}
              <ICONS.back />
            </Button>
          </IconButton>
          <Typography variant="h5" sx={{ height: "15px" }}>
            Results
          </Typography>
        </Box>
        <Typography variant="h7" sx={{ ml: 10 }}>
          Price and other details may vary based on product size and colour.
        </Typography>

        <Grid container spacing={2} my={2}>
          {productsection &&
            productsection?.map((section) => (
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={section._id}>
                {categorysection?.loading ? (
                  <Card>
                    <Skeleton variant="rectangular" width="100%" height={300} />
                    <CardContent>
                      <Skeleton height={40} />
                      <Skeleton height={40} />
                    </CardContent>
                    <CardActions>
                      <Skeleton width={100} height={40} />
                    </CardActions>
                  </Card>
                ) : (
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      textDecoration: "none",
                    }}
                  >
                    {section.image && (
                      <img
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                        }}
                        src={`https://ecommerce-server-le5a.onrender.com/${section.image}`}
                        alt={section.name}
                      />
                    )}
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          // gap: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="black"
                          sx={{
                            fontWeight: 500,
                          }}
                          variant="h6"
                        >
                          {section.name}
                        </Typography>
                        <Typography
                          color="black"
                          sx={{
                            fontWeight: 500,
                          }}
                          variant="h6"
                        >
                          ₹{section.price}
                        </Typography>
                        <CardActions sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            endIcon={<ICONS.shoppingcart />}
                            onClick={() =>
                              navigate(`/newproductdetails/${section._id}`, {
                                state: { id: section._id },
                              })
                            }
                          >
                            Buy
                          </Button>
                        </CardActions>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductCategory;
