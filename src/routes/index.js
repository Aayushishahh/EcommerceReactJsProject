import React from "react";
import MainLayout from "../layout/MainLayout";
import Header from "../layout/Header";
import { Route, Routes } from "react-router-dom";
import SignUp from "../containers/SignUp";
import Login from "../containers/Login";
import Home from "../containers/Home";
import Account from "../containers/Account";
import Customer from "../containers/CustomerCare";
import AboutUs from "../containers/AboutUs";
import NewProductDetails from "../containers/NewProductDetails";
import ProductCards from "../containers/Home/HomeCards";
import NewCart from "../containers/Newcart";
import ProductCategory from "../containers/ProductCategory";
import Orders from "../containers/Orders";
import Checkout from "../containers/Checkout";
import ForgotPassword from "../containers/ForgotPassword";
import ResetPassword from "../containers/ResetPassword";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/mens"
            element={<ProductCategory category="Men's Wear" />}
          />
          <Route
            path="/womens"
            element={<ProductCategory category="Women's wear" />}
          />
          <Route
            path="/kids"
            element={<ProductCategory category="Kid's Wear" />}
          />
          <Route
            path="/electronics"
            element={<ProductCategory category="Electronics" />}
          />
          <Route
            path="/cosmetics"
            element={<ProductCategory category="Cosmetics" />}
          />
          <Route
            path="/footwear"
            element={<ProductCategory category="Footwear" />}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/customer" element={<Customer />} />

          <Route
            path="/newproductdetails/:id"
            element={<NewProductDetails />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/chechout" element={<Checkout />} />

          <Route path="/newcart" element={<NewCart />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default Routing;
