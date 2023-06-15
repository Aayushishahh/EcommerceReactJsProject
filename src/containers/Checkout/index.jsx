import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ICONS } from "../../assests";
import { DrawerContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { Google_key } from "../../utils/constant";

const Checkout = () => {
  const navigate = useNavigate();
  const { open, setOpen } = useContext(DrawerContext);

  const [selectedStep, setSelectedStep] = useState("delivery");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    Country: "",
    PinCode: "",
  });
  // const [newAddress, setNewAddress] = useState({
  //   Country: "",
  //   FullName: "",
  //   City: "",
  //   State: "",
  //   PinCode: "",
  //   PhoneNumber: "",
  // });
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    if (
      event.target.value === "credit-card" ||
      event.target.value === "paypal"
    ) {
      handleDialogOpen();
    }
  };
  // console.log("=====>", openDialog);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleNext = () => {
    if (selectedStep === "delivery") {
      setSelectedStep("payment");
    }
  };

  const handleBack = () => {
    if (selectedStep === "payment") {
      setSelectedStep("delivery");
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDialogOpen = () => {
    if (selectedPaymentMethod === "credit-card") {
      setOpenDialog(true);
    }
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddNewAddress = () => {
    setOpenAddressModal(true);
  };
  // console.log("openAddressModal", openAddressModal);

  const handleAddressModalClose = () => {
    setOpenAddressModal(false);
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="md">
        <Box
          sx={{
            my: 4,
            minHeight: "100vh",
            width: open ? `calc(100% - ${"240px"})` : "100%",
            marginLeft: open ? `${"255px"}` : 0,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, display: "flex", justifyContent: "center" }}
          >
            Checkout
          </Typography>
          <Typography variant="h5" onClick={handleBack} sx={{ mb: 2 }}>
            1. Select a delivery address
          </Typography>

          {selectedStep === "delivery" && (
            <Box
              sx={{
                p: 3,
                border: "1px solid #ddd",
                borderRadius: 4,
                mb: 4,
                //   backgroundColor: '#f7f7f7',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Address
              </Typography>

              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Select Address</FormLabel>
                <RadioGroup
                  aria-label="address"
                  name="address"
                  value={selectedAddress}
                  onChange={handleAddressChange}
                >
                  <FormControlLabel
                    value="address1"
                    control={<Radio />}
                    label="Address 1"
                  />
                  <FormControlLabel
                    value="address2"
                    control={<Radio />}
                    label="Address 2"
                  />
                  <FormControlLabel
                    value="address3"
                    control={<Radio />}
                    label="Address 3"
                  />
                </RadioGroup>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleAddNewAddress}
                  sx={{ mt: 1, mb: 1 }}
                >
                  + Add New Address
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#757575",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#555555",
                    },
                  }}
                  onClick={handleNext}
                >
                  Use this address
                </Button>
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
            </Box>
          )}

          <hr />
          <Typography variant="h5" onClick={handleNext} sx={{ mb: 2, mt: 4 }}>
            2. Payment Method
          </Typography>

          {selectedStep === "payment" && (
            <Box
              sx={{
                p: 3,
                border: "1px solid #ddd",
                borderRadius: 4,
                // backgroundColor: "#f7f7f7",
              }}
            >
              <Typography variant="h5">
                Your saved credit and debit cards
              </Typography>

              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <IconButton sx={{ p: 0 }}>
                  <ICONS.info fontSize="small" />
                </IconButton>
                Please ensure your card is enabled for online transactions.
                <Button color="primary" onClick={handleModalOpen}>
                  Learn More
                </Button>
              </Typography>

              <FormControl component="fieldset" sx={{ mt: 5 }}>
                <FormLabel component="legend">Select Payment Method</FormLabel>
                <RadioGroup
                  aria-label="payment-method"
                  name="payment-method"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <FormControlLabel
                    value="credit-card"
                    control={<Radio />}
                    label="Pay with Debit/Credit/ATM Cards"
                  />
                  {selectedPaymentMethod === "credit-card" && (
                    <Button color="primary" onClick={handleDialogOpen}>
                      + Add Card Details
                    </Button>
                  )}
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="Other UPI Apps"
                  />
                  {selectedPaymentMethod === "paypal" && (
                    <>
                      <Typography color="primary" onClick={handleDialogOpen}>
                        Please enter your UPI ID
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={8}>
                          <TextField
                            placeholder="Ex: MobileNumber@upi"
                            id="cardName"
                            fullWidth
                            size="small"
                          />
                        </Grid>
                      </Grid>
                      <Button sx={{ borderRadius: "10px", color: "black" }}>
                        Verify
                      </Button>
                    </>
                  )}

                  <FormControlLabel
                    value="cash-on-delivery"
                    control={<Radio />}
                    label="Cash on Delivery/Pay on Delivery"
                  />
                </RadioGroup>
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* <Button variant="contained" onClick={handleBack}>
                  Back
                </Button> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/orders")}
                  sx={{ mt: 5 }}
                  style={{
                    backgroundColor: "#757575",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#555555",
                    },
                  }}
                >
                  Place Your Order
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle sx={{ backgroundColor: "lightgrey" }}>
            Enter Card Details
          </DialogTitle>
          {/* <hr /> */}
          <DialogContent dividers>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <label htmlFor="cardName">Name on Card</label>
              </Grid>
              <Grid item xs={8}>
                <TextField id="cardName" fullWidth size="small" />
              </Grid>
              <Grid item xs={4}>
                <label htmlFor="cardNumber">Card Number</label>
              </Grid>
              <Grid item xs={8}>
                <TextField id="cardNumber" fullWidth size="small" />
              </Grid>
              <Grid item xs={4}>
                <label htmlFor="expiryDate">Expiry Date</label>
              </Grid>
              <Grid item xs={8}>
                <TextField id="expiryDate" fullWidth size="small" />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleDialogClose}
              sx={{ borderRadius: "10px", color: "black" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDialogClose}
              sx={{
                borderRadius: "10px",
                color: "black",
                backgroundColor: "lightgrey",
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openAddressModal} onClose={handleAddressModalClose}>
          <DialogTitle sx={{ backgroundColor: "lightgrey" }}>
            Add Delivery Address
          </DialogTitle>
          <DialogContent dividers>
            <FixedTags label htmlFor="country" nested={true} />
            Country
            {/* <Autocomplete
              style={{ width: "100%" }}
              openOnFocus={true}
              apiKey={Google_key}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
              PaperComponent={({ children }) => (
                <Paper style={{ position: "relative", zIndex: 9999 }}>
                  {children}
                </Paper>
              )}
            /> */}
            <TextField id="country" fullWidth size="small" sx={{ mb: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
              sx={{
                borderRadius: "10px",
                color: "black",
                backgroundColor: "lightgrey",
              }}
            >
              Use this Address
            </Button>
          </DialogActions>
        </Dialog>
        {/* <label htmlFor="name">Full Name</label>
            <TextField id="name" fullWidth size="small" sx={{ mb: 2 }} />

            <label htmlFor="address">Address</label>
            <TextField id="address" fullWidth size="small" sx={{ mb: 2 }} />

            <label htmlFor="city">City</label>
            <TextField id="city" fullWidth size="small" sx={{ mb: 2 }} />

            <label htmlFor="state">State</label>
            <TextField id="state" fullWidth size="small" sx={{ mb: 2 }} />

            <label htmlFor="pincode">PinCode</label>
            <TextField id="pincode" fullWidth size="small" sx={{ mb: 2 }} /> */}

        {/* <div style={{ position: "absolute", zIndex: 9999 }}>
                  <Autocomplete
                    apiKey={Google_key}
                    onPlaceSelected={(place) => {
                      console.log(place);
                    }}
                  />
                </div> */}

        <Dialog open={openModal} onClose={handleModalClose}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
              backgroundColor: "lightgrey",
              height: "50px",
            }}
          >
            <Typography variant="h6">Learn More</Typography>
            <Button onClick={handleModalClose} color="primary">
              X
            </Button>
          </Box>
          <hr />
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 5 }}>
              As per latest RBI guidelines, your banks may disable your
              credit/debit cards for online transactions by default if – (a)
              your card is newly issued/renewed/re-issued, or (b) your card has
              not been used for online transactions. Don’t worry! You can follow
              the steps listed below to enable your cards and enjoy quick and
              convenient payments with Amazon Pay.
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              SBI BANK – CREDIT CARD
            </Typography>
            <Typography variant="body2">
              (a) Login to SBI Card app/website; (b) Navigate to “Cards Usage”
              section; (c) Click on “Manage card transactions”; (d) Enable your
              card (e) Enter OTP to confirm changes
            </Typography>

            <Typography variant="body1" sx={{ mt: 3, fontWeight: "bold" }}>
              SBI BANK – DEBIT CARD
            </Typography>
            <Typography variant="body2">
              (a) Login to SBI YONO app/internet banking portal; (b) Navigate to
              “Service Requests” section; (c) Click on “ATM/Debit cards Usage”;
              (d) Enable your card; (e) Enter OTP to confirm changes
            </Typography>

            <Typography variant="body1" sx={{ mt: 3, fontWeight: "bold" }}>
              ICICI BANK – CREDIT CARD
            </Typography>
            <Typography variant="body2">
              (a) Log in to the ICICI mobile app/internet banking; (b) Navigate
              to ‘Cards’ section (c) Click on ‘Manage Card' (d) Enable your
              card. Note: Internet banking users may have to verify the request
              with an OTP.
            </Typography>

            <Typography variant="body1" sx={{ mt: 3, fontWeight: "bold" }}>
              ICICI BANK – DEBIT CARD
            </Typography>
            <Typography variant="body2">
              (a) Login to the ICICI mobile app/internet banking; (b) Navigate
              to “Card Services”; (c) Select “Modify Debit Card Limit” option;
              (d) Select "Domestic card limit" option; (e) Set the limit and
              enable your card
            </Typography>
            <Typography variant="body1" sx={{ mt: 3, fontWeight: "bold" }}>
              OTHER BANKS
            </Typography>
            <Typography variant="body2">
              Please login to your bank’s mobile app/internet banking portal and
              follow appropriate steps.
            </Typography>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

const FixedTags = function ({ nested }) {
  return (
    <div style={{ backgroundColor: "red" }}>
      <Autocomplete
        onFocus={() => console.log("autocomplete focus", nested)}
        multiple
        apiKey={Google_key}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        // getOptionLabel={option => option.title}
        // defaultValue={[autoCompleteItems[1], autoCompleteItems[2]]}
        style={{ width: 500, zIndex: 1001 }}
        renderInput={(params) => (
          <TextField
            {...params}
            onClick={() => console.log("Autocomplete TextField click", nested)}
            label="Fixed tag"
            variant="outlined"
            placeholder="items..."
            sx={{ zIndex: 0 }}
          />
        )}
      />
    </div>
  );
};

export default Checkout;
