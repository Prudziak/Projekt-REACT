import React, { Component } from "react";
import { Link } from "react-router-dom";
import DisplayCategories from "./displayCategories";
import DisplayShoes from "./displayShoes";
import { ACCESS_LEVEL_GUEST } from "../../config/global_constants";
import Logout from "./logout";

export default class ShopMainpage extends Component {
  render() {
    return (
      <div className="shop-mainpage">
        {!sessionStorage.getItem("cart")
          ? sessionStorage.setItem("cart", JSON.stringify([]))
          : null}
        <div className="shop-mainpage-content">
          <div className="shop-mainpage-content-center">
            {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
              <div className="welcome">
                <h5>Welcome {sessionStorage.username}</h5>
                <Logout />
              </div>
            ) : null}
            <div className="shop-mainpage-title">
              <label>Sneakers Store</label>
            </div>

            <div className="add-new-car">
              <Link className="blue-button" to={"/addcar"}>
                Add New But
              </Link>
            </div>
            <DisplayCategories />
          </div>
          <DisplayShoes />
        </div>
      </div>
    );
  }
}
