import React, { Component } from "react";
import { Link } from "react-router-dom";
import DisplayCategories from "./displayCategories";
import DisplayShoes from "./displayShoes";

export default class ShopMainpage extends Component {
  render() {
    return (
      <div className="shop-mainpage">
        <div className="shop-mainpage-content">
          <div className="shop-mainpage-content-center">
            <div className="shop-mainpage-title">
              <label>Sneakers Store</label>
            </div>

            {/* <div className="add-new-car">
                <Link className="blue-button" to={"/addcar"}>
                  Add New Car
                </Link>
              </div> */}
            <DisplayCategories />
          </div>
          <DisplayShoes />
        </div>
      </div>
    );
  }
}
