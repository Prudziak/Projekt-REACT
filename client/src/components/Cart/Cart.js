import React, { Component } from "react";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import PreviousOrders from "./PreviousOrders";
import { ACCESS_LEVEL_GUEST } from "../../config/global_constants";
import Logout from "../Shop/logout";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(sessionStorage.getItem("cart")),
      total: 0,
      products: [],
    };
  }

  handleClick = () => {
    this.state.cart.map((item) => {
      let new_cart = this.state.cart.filter((shoes) => shoes._id !== item._id);
      sessionStorage.setItem("cart", JSON.stringify(new_cart));
      this.setState({ cart: new_cart });
    });
  };

  render() {
    this.state.total = this.state.cart.reduce(
      (total, item) => total + item.price,
      0
    );
    for (const element of this.state.cart) {
      this.state.products.push(element._id);
    }
    console.log(this.state.products);
    return (
      <div className="cart-page">
        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
          <div className="welcome">
            <h5>Welcome {sessionStorage.username}</h5>
            <Logout />
          </div>
        ) : null}
        <h2 className="cart-header">Your cart</h2>
        {this.state.cart.length > 0 ? (
          <div className="cart">
            {this.state.cart.map((item) => (
              <div className="cart-content" key={item._id}>
                <img className="cart-img" src={item.image}></img>
                <h3>{item.brand}</h3>
                <h3>{item.model}</h3>
                <h3>{item.price} $</h3>
                <button className="remove-from-cart" onClick={this.handleClick}>
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-summary">
              <h3>Summary</h3>
              <h3>Total: {this.state.total} $</h3>
            </div>
            <div className="cart-buttons">
              <Checkout
                total={this.state.total}
                products={this.state.products}
              />
              <button className="continue-shopping">
                <Link className="cart-links" to={"/shop"}>
                  Continue shopping
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <h3 className="empty-cart">Your cart is empty</h3>
        )}
        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
          <PreviousOrders />
        ) : null}
      </div>
    );
  }
}
