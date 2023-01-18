import React, { Component } from "react";
import DisplayCategories from "./displayCategories";
import DisplayShoes from "./displayShoes";
import Logout from "./logout";
import { ACCESS_LEVEL_GUEST } from "../../config/global_constants";

export default class ShopMainpage extends Component {
  render() {
    return (
      <div className="shop-mainpage">
        {!sessionStorage.getItem("cart")
          ? sessionStorage.setItem("cart", JSON.stringify([]))
          : null}
        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
          <div className="welcome">
            <h5>Welcome {sessionStorage.username}</h5>
            <Logout />
          </div>
        ) : null}
        <div className="shop-mainpage-content">
          <div className="shop-mainpage-content-center">
            <div className="shop-mainpage-title">
              <label>Sneakers Store</label>
            </div>
            <DisplayCategories />
          </div>
          <DisplayShoes />
        </div>
      </div>
    );
  }
}
