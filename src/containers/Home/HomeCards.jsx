import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ICONS, IMAGES } from "../../assests";
import { DrawerContext } from "../../App";
import { useEffect } from "react";
import { api } from "../../api";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getBestSeller, getProduct } from "../../redux/reducers/ProductSlice";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProductCards(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open, setOpen } = React.useContext(DrawerContext);
  const [items, setItems] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage] = useState(8);
  const list = useSelector((state) => state?.product);
  console.log("list", list);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBestSeller());
  }, []);

  const totalPages = Math.ceil(list?.product?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list?.product?.slice(indexOfFirstItem, indexOfLastItem);

  const sortedItems = currentItems?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.pric;
    }
  });

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const renderBestsellerTag = (product) => {
    if (product.bestSeller) {
      return (
        <Typography
          variant="subtitle2"
          sx={{
            backgroundColor: "#f44336",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: "14px",
            letterSpacing: "1px",
            width: "45%",
          }}
        >
          Bestseller
        </Typography>
      );
    }
    return null;
  };

  return (
    <>
      <Box>
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
            // mr: 22,
          }}
        >
          Shop The Latest
        </Typography>
        <Box
          id={id}
          sx={{
            minHeight: "100vh",
            width: open ? `calc(100% - ${"240px"})` : "100%",
            marginLeft: open ? `${"245px"}` : 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              pr: 2,
            }}
          >
            <Typography sx={{ mr: 1 }}>Sort by Price:</Typography>
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </Box>

          <Grid container spacing={2} my={2} sx={{}}>
            {currentItems &&
              currentItems.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  xl={3}
                  key={product._id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      textDecoration: "none",
                    }}
                  >
                    {product.bestSeller && renderBestsellerTag(product)}
                    {product.image && (
                      <img
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "contain",
                          margin: "auto",
                        }}
                        src={`https://ecommerce-server-le5a.onrender.com/${product.image}`}
                        alt={product.name}
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
                          {product.name}
                        </Typography>
                        <Typography
                          color="black"
                          sx={{
                            fontWeight: 500,
                          }}
                          variant="h6"
                        >
                          ₹{product.price}
                        </Typography>
                        <CardActions sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            endIcon={<ICONS.shoppingcart />}
                            onClick={() =>
                              navigate(`/newproductdetails/${product._id}`, {
                                state: { id: product._id },
                              })
                            }
                            style={{
                              backgroundColor: "#757575",
                              color: "#ffffff",
                              "&:hover": {
                                backgroundColor: "#555555",
                              },
                            }}
                          >
                            Buy
                          </Button>
                        </CardActions>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Stack
            spacing={2}
            sx={{
              dispaly: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              mb: 2,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
