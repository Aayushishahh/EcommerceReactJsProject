import {
  Box,
  Container,
  Typography,
  Button,
  Toolbar,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DrawerContext } from "../../App";
import { ICONS } from "../../assests";
import { getOrderDetails } from "../../redux/reducers/CartSlice";
import { formatDate } from "../../utils/function";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const Orders = () => {
  const { open, setOpen } = useContext(DrawerContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.userData?.data?.token);
  const orderlist = useSelector((state) => state?.cart?.ordersummary);
  console.log("orderlist", orderlist);

  useEffect(() => {
    dispatch(getOrderDetails({ token: token }));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      // fontFamily: "Arial",
    },
    title: {
      backgroundColor: "#333",
      color: "white",
      width: "100%",
      paddingVertical: 10,
      textAlign: "center",
      fontSize: 24,
      marginBottom: 20,
    },
    subtext: {
      fontSize: 12,
      marginBottom: 10,
    },
    tableContainer: {
      marginTop: 20,
      marginBottom: 40,
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
    },
    tableHeader: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      backgroundColor: "#333",
      color: "white",
      padding: 10,
      marginBottom: 5,
    },
    tableHeaderText: {
      fontWeight: "bold",
      flex: 1,
      textAlign: "center",
      fontSize: 12,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      padding: 10,
    },
    tableCell: {
      flex: 1,
      textAlign: "center",
      fontSize: 12,
    },
    subtotal: {
      fontSize: 14,
      textAlign: "right",
      marginTop: 10,
      fontWeight: "bold",
    },
  });

  const calculateSubtotal = (orders) => {
    let subtotal = 0;
    orders?.forEach((item) => {
      subtotal += item.qty * item.product_id.price;
    });
    return subtotal;
  };

  const sortedOrderlist = [...orderlist].sort((a, b) => {
    // console.log("a", a);
    const dateA = new Date(a?.orderDetails[0]?.createdAt);
    const dateB = new Date(b?.orderDetails[0]?.createdAt);
    return dateB - dateA;
  });

  const handleDownloadInvoice = async (orders) => {
    // Create a new PDF document
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.subtext}>BILLING TO:</Text>
            <Text style={styles.subtext}>Aayushi Shah</Text>
            <Text style={styles.subtext}>Waghodia Road</Text>
            <Text style={styles.subtext}>Vadodara</Text>
            <View style={styles.tableContainer}>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>PRODUCT</Text>
                  <Text style={styles.tableHeaderText}>PRICE</Text>
                  <Text style={styles.tableHeaderText}>QTY</Text>
                  <Text style={styles.tableHeaderText}>TOTAL</Text>
                </View>
                {orders?.map((item, index) => (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>
                      {item?.product_id?.name}
                    </Text>
                    <Text style={styles.tableCell}>
                      {"Rs "}
                      {item?.product_id?.price}
                    </Text>
                    <Text style={styles.tableCell}>{item?.qty}</Text>
                    <Text style={styles.tableCell}>
                      {"Rs "}
                      {item?.qty * item?.product_id?.price}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <Text style={styles.subtotal}>
              SUB TOTAL: {"Rs "}
              {calculateSubtotal(orders)}
            </Text>
            <Text style={styles.subtotal}>DELIVERY: FREE</Text>
            <Text style={styles.subtotal}>
              TOTAL: {"Rs "}
              {calculateSubtotal(orders)}
            </Text>
          </View>
        </Page>
      </Document>
    );

    // Convert the PDF document to a blob
    const pdfBlob = await pdf(doc).toBlob();

    // Save the PDF blob as a file
    saveAs(pdfBlob, "invoice.pdf");
  };

  // Group the products by date
  const groupedOrders = {};
  sortedOrderlist?.forEach((item) => {
    item?.orderDetails?.forEach((order) => {
      const orderDate = formatDate(order.createdAt);
      if (groupedOrders[orderDate]) {
        groupedOrders[orderDate].push(order);
      } else {
        groupedOrders[orderDate] = [order];
      }
    });
  });

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          mt: 3,
          width: open ? `calc(100% - ${"240px"})` : "100%",
          marginLeft: open ? `${"255px"}` : 5,
          mr: 5,
          p: 3,
        }}
      >
        <Box div style={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ width: "30px" }}>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{ color: "black" }}
            >
              <ICONS.back />
            </Button>
          </IconButton>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginLeft: "5px" }}
          >
            Order Summary:
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 3, mt: 5 }}>
          Thank you for placing your order! Here is your order summary:
        </Typography>

        {Object.entries(groupedOrders).map(([date, orders]) => (
          <Box key={date} mb={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Order Date: {date}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleDownloadInvoice(orders)}
                sx={{
                  backgroundColor: "#757575",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#555555",
                  },
                }}
              >
                Download Invoice
              </Button>
            </Box>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ mb: 3 }}
            >
              {orders[0]?.order_id && (
                <React.Fragment>Order ID: {orders[0].order_id}</React.Fragment>
              )}
            </Typography>

            <Grid container spacing={2}>
              {orders?.map((item, index) => (
                <Grid key={item.order_id} item xs={12} md={6} lg={6}>
                  {/* {index === 0 && (
                    <Typography gutterBottom variant="h7" component="div">
                      Order id: {item?.order_id}
                    </Typography>
                  )} */}
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 2,
                      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={`https://ecommerce-server-le5a.onrender.com/${item?.product_id?.image}`}
                      alt={item?.orderDetails?.product_id?.name}
                      sx={{ width: 100, height: 100, objectFit: "contain" }}
                    />

                    <CardContent sx={{ flex: 1, padding: 2 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        fontWeight="bold"
                        component="div"
                      >
                        {item?.product_id?.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        {"₹"} {item?.qty * item?.product_id?.price}
                      </Typography>
                      <Typography variant="body2">
                        <span style={{ fontWeight: "bold" }}>Quantity: </span>
                        {item?.qty}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Orders;
