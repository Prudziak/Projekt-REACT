import React, { Component } from "react";
import axios from "axios";

import {
  SERVER_HOST,
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_NORMAL_USER,
} from "../../config/global_constants";
import AddToCart from "./AddToCart";
import Logout from "./logout";
import { Link } from "react-router-dom";
import DeleteProduct from "../AdminComponents/DeleteProduct";

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
        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
          <div className="welcome">
            <h5>Welcome {sessionStorage.username}</h5>
            <Logout />
          </div>
        ) : null}
        <div className="whole-page">
          <img className="details-img" src={this.state.shoe.image} alt="shoe" />
          <div className="details-div">
            <h4>
              {this.state.shoe.brand} - {this.state.shoe.model}
            </h4>
            <b>Price</b>
            <p className="shoe-cena">{this.state.shoe.price} $</p>
            <b>Description</b>
            <p className="shoe-desc">{this.state.shoe.description}</p>
            {this.state.shoe.stock > 0 ? (
              <div className="add-to-cart">
                <AddToCart />
              </div>
            ) : (
              <div className="no-stock">
                <p>Out of stock</p>
              </div>
            )}
            {sessionStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? (
              <div className="admin-buttons">
                <Link
                  className="yellow-button"
                  to={"/edit/" + this.state.shoe._id}
                >
                  Edit product
                </Link>
                <DeleteProduct />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
