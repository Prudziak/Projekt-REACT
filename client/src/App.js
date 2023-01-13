import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ShopMainpage from "./components/Shop/shopMainpage";
import Burger from "./components/Shop/burger";
import AddProd from "./components/Shop/addProd";
import DisplayProductPage from "./components/Shop/displayProduct";
import ProductDetails from "./components/Shop/productDetails";
import Logout from "./components/Shop/logout";
import LoggedInRoute from "./components/Shop/LoggedInRoute";
import Cart from "./components/Cart/Cart";
import logo from "./images/logo.png";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter id="root">
        <div>
          <h1
            onClick={() => {
              window.location.href = "http://localhost:3000/";
            }}
          >
            <img className="shop-icon" src={require("./images/logo.png")} />
          </h1>
        </div>
        <Burger />
        <Switch>
          <Route exact path="/" component={ShopMainpage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/shop" component={ShopMainpage} />
          <Route exact path="/addcar" component={AddProd} />
          <Route exact path="/shoes/:brand" component={DisplayProductPage} />
          <Route exact path="/shoes/prod/:id" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />
          <LoggedInRoute exact path="/logout" component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}
