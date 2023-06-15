import {
  Box,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import { DrawerContext } from "../../App";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { open, setOpen } = React.useContext(DrawerContext);
  const [paymentData, setPaymentData] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    address: "",
    locality: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state?.auth?.userData?.data?.token);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    // Validate cardholderName
    if (!paymentData.cardholderName.trim()) {
      errors.cardholderName = "Cardholder name is required";
    }

    // Validate cardNumber
    if (!paymentData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(paymentData.cardNumber)) {
      errors.cardNumber = "Invalid card number";
    }

    // Validate expirationDate
    if (!paymentData.expirationDate.trim()) {
      errors.expirationDate = "Expiration date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expirationDate)) {
      errors.expirationDate = "Invalid expiration date (MM/YY)";
    }

    // Validate cvv
    if (!paymentData.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(paymentData.cvv)) {
      errors.cvv = "Invalid CVV";
    }

    // Validate address
    if (!paymentData.address.trim()) {
      errors.address = "Address is required";
    }

    // Validate locality
    if (!paymentData.locality.trim()) {
      errors.locality = "Locality is required";
    }

    // Validate city
    if (!paymentData.city.trim()) {
      errors.city = "City is required";
    }

    // Validate pincode
    if (!paymentData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(paymentData.pincode)) {
      errors.pincode = "Invalid pincode";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await api.order.create({ paymentData, token: token });
        console.log("Place order API response:", response.data);
        // Additional actions after placing the order
        navigate("/orders");
      } catch (error) {
        console.log("Error placing order:", error);
      }
    } else {
      console.log("Form is invalid. Please fix the errors.");
    }
  };

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          padding: "40px",
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#f8f8f8",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: "20px", color: "#333" }}
        >
          Payment Information
        </Typography>

        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Cardholder Name"
                variant="outlined"
                fullWidth
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handleChange}
              />
              {errors.cardholderName && (
                <p style={{ color: "red" }}>{errors.cardholderName}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
              />
              {errors.cardNumber && (
                <p style={{ color: "red" }}>{errors.cardNumber}</p>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Expiration Date"
                variant="outlined"
                fullWidth
                name="expirationDate"
                value={paymentData.expirationDate}
                onChange={handleChange}
              />
              {errors.expirationDate && (
                <p style={{ color: "red" }}>{errors.expirationDate}</p>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
              />
              {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Billing Address
              </Typography>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={paymentData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address}</p>
              )}
              <TextField
                label="Locality"
                variant="outlined"
                fullWidth
                name="locality"
                value={paymentData.locality}
                onChange={handleChange}
                sx={{ marginTop: "10px" }}
              />
              {errors.locality && (
                <p style={{ color: "red" }}>{errors.locality}</p>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                name="city"
                value={paymentData.city}
                onChange={handleChange}
              />
              {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                name="pincode"
                value={paymentData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && (
                <p style={{ color: "red" }}>{errors.pincode}</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePlaceOrder}
                sx={{
                  marginTop: "20px",
                  background: "#ff3366",
                  "&:hover": { background: "#e6005c" },
                }}
              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PaymentPage;
