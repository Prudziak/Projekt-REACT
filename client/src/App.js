import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ShopMainpage from "./components/Shop/shopMainpage";
import Burger from "./components/Shop/burger";
import AddProd from "./components/Shop/addProd";
import DisplayProductPage from "./components/Shop/displayProduct";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter id="root">
        <div>
          <h1
            onClick={() => {
              window.location.href = "http://localhost:3000/";
            }}
          ></h1>
        </div>
        <Burger />
        <Routes>
          <Route exact path="/" element={<ShopMainpage />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/shop" element={<ShopMainpage />} />
          <Route exact path="/addprod" element={<AddProd />} />
          <Route exact path="/products" element={<DisplayProductPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
