import React, { Component } from "react";

export default class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(sessionStorage.getItem("cart")),
    };
  }

  handleClick = () => {
    this.state.cart.push(JSON.parse(sessionStorage.getItem("product")));
    sessionStorage.setItem("cart", JSON.stringify(this.state.cart));
  };

  render() {
    return (
      <div className="add-to-cart">
        <div className="add-to-cart-content">
          <button onClick={this.handleClick}>
            Add to cart
            <img
              className="cart-icon"
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            />
          </button>
        </div>
      </div>
    );
  }
}
