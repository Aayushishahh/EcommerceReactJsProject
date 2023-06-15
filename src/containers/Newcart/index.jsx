import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Hidden,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import {
  deleteCart,
  getCart,
  removecartItems,
} from "../../redux/reducers/CartSlice";
import { api } from "../../api";
import { DrawerContext } from "../../App";
import { ICONS } from "../../assests";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { updateCart } from "../../redux/reducers/CartSlice";
import Loader from "../../components/Loader";

const NewCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();

  const token = useSelector((state) => state?.auth?.userData?.data?.token);
  const cartlist = useSelector((state) => state?.cart?.cartproducts);
  console.log("cartlist", cartlist);
  const { open, setOpen } = useContext(DrawerContext);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    dispatch(getCart({ token: token }));
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    // Perform delete operation
    await dispatch(removecartItems({ id: deleteItemId, token: token }));

    // Close the confirmation dialog
    setIsDeleteOpen(false);
  };

  const handleIncrement = async (id, qty) => {
    let quantity = parseInt(qty);
    if (quantity > 0) {
      quantity += 1;
      const data = {
        qty: quantity,
        id: id,
        token: token,
      };
      await api.cart.update(data);
      dispatch(getCart({ token: token }));
    }
  };

  const handleDecrement = async (id, qty) => {
    let quantity = qty;
    if (quantity > 1) {
      quantity -= 1;
      const data = {
        qty: quantity,
        id: id,
        token: token,
      };
      await api.cart.update(data);
      dispatch(getCart({ token: token }));
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const response = await api.order.create({ token: token });
      navigate("/chechout");
    } catch (error) {
      console.log("Error placing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const grandTotal =
    cartlist &&
    cartlist?.reduce(function (acc, obj) {
      const itemTotal = obj.qty * obj.product_id?.price;
      return acc + itemTotal;
    }, 0);
  console.log("grandTotal", grandTotal);

  return (
    <>
      <Toolbar />
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: "100vh",
            width: open ? `calc(100% - ${"240px"})` : "100%",
            marginLeft: open ? `${"255px"}` : 5,
            mr: 5,
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: "bold", my: 5 }}
              >
                Shopping Cart
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <TableContainer
                component={Card}
                sx={{
                  mr: 5,
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                  mb: 5,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartlist?.map((item) => (
                      <TableRow key={item?.product_id?._id}>
                        <TableCell>
                          <CardMedia
                            component="img"
                            image={`https://ecommerce-server-le5a.onrender.com/${item?.product_id?.image}`}
                            alt={item?.product_id?.name}
                            sx={{
                              width: 100,
                              height: 130,
                              objectFit: "contain",
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {item?.product_id?.name}
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              variant="outlined"
                              onClick={(e) =>
                                handleDecrement(
                                  item?._id,
                                  item.qty,
                                  item?.product_id?.price
                                )
                              }
                              sx={{
                                color: "red",
                                marginRight: "8px",
                                fontSize: "20px",
                                height: "30px",
                                width: "25px",
                              }}
                            >
                              -
                            </Button>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: "15px",
                                  sm: "20px",
                                  md: "20px",
                                  xl: "20px",
                                },
                                fontWeight: "500",
                              }}
                            >
                              {item?.qty}
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={(e) =>
                                handleIncrement(item?._id, item?.qty)
                              }
                              sx={{
                                color: "green",
                                marginLeft: "8px",
                                fontSize: "20px",
                                height: "30px",
                                width: "25px",
                              }}
                            >
                              +
                              {/* {isLoading ? <Loader size={20} /> : "+"}   */}
                            </Button>
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {item?.product_id?.price}
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          {item?.qty * item?.product_id?.price}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDelete(item?.product_id?._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Dialog
                            open={isDeleteOpen}
                            onClose={() => setIsDeleteOpen(false)}
                          >
                            {/* <DialogTitle>Confirmation</DialogTitle> */}
                            <DialogContent>
                              <Typography>
                                Are you sure you want to delete this product
                                from cart?
                              </Typography>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => setIsDeleteOpen(false)}>
                                Cancel
                              </Button>
                              <Button
                                onClick={handleDeleteConfirmation}
                                autoFocus
                              >
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Cart Total
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <span>Total Items:</span>
                    <span>{cartlist?.length}</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <span>Subtotal:</span>
                    <span>
                      {"₹"} {grandTotal}
                    </span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <span>Delivery:</span>
                    <span>Free</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 1,
                      fontWeight: "bold",
                    }}
                  >
                    <span>Grand Total:</span>
                    <span>
                      {"₹"} {grandTotal}
                    </span>
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handlePlaceOrder}
                    style={{
                      backgroundColor: "#757575",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#555555",
                      },
                    }}
                    disabled={isLoading}
                  >
                    Checkout
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default NewCart;
