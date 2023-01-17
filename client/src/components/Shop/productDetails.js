import React, { Component } from "react";
import axios from "axios";

import { SERVER_HOST } from "../../config/global_constants";
import Logout from "./logout";
import { ACCESS_LEVEL_GUEST } from "../../config/global_constants";
import AddToCart from "./AddToCart";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoe: [],
      current_id: sessionStorage.getItem("current_id"),
    };
  }

  componentDidMount() {
    console.log(this.state.current_id);
    axios
      .get(`${SERVER_HOST}/shoes/${this.state.current_id}`)
      .then((res) => {
        this.setState({ shoe: res.data });
        console.log(res.data);
        sessionStorage.setItem("product", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="site">
        <div>
          {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
            <div className="welcome">
              <h5>Welcome {sessionStorage.username}</h5>
              <Logout />
            </div>
          ) : null}
        </div>
        <div className="whole-page">
          <img className="details-img" src={this.state.shoe.image} alt="shoe" />
          <div className="details-div">
            <h4>
              {this.state.shoe.brand} - {this.state.shoe.model}
            </h4>
            <b>Price</b>
            <p className="shoe-cena">{this.state.shoe.price} USD</p>
            <b>Description</b>
            <p className="shoe-desc">{this.state.shoe.description}</p>
            {this.state.shoe.stock > 0 ? (
              <div className="add-to-cart">
                <AddToCart />
              </div>
            ) : (
              <div>
                <p className="out-of-stock">Out of stock</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
