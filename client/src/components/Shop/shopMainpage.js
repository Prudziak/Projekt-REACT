import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <div className="row">
              <div className="column">
                <button>Nike</button>
              </div>
              <div className="column">
                <button type="submit">Vans</button>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <button type="submit">Adidas</button>
              </div>
              <div className="column">
                <button type="submit">Converse</button>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <button type="submit">Air Jordan</button>
              </div>
              <div className="column">
                <button type="submit">Puma</button>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <button type="submit">New Balance</button>
              </div>
              <div className="column">
                <button type="submit">Others</button>
              </div>
              {/* <div className="add-new-car">
                <Link className="blue-button" to={"/addcar"}>
                  Add New Car
                </Link>
              </div> */}
            </div>
          </div>
          <DisplayShoes />
        </div>
      </div>
    );
  }
}
