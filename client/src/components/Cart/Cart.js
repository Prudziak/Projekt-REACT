import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(sessionStorage.getItem("cart")),
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
    return (
      <div className="cart-page">
        {/* {console.log(this.state.cart)} */}
        <h2 className="cart-header">Your cart</h2>
        {this.state.cart.length > 0 ? (
          <div className="cart">
            {this.state.cart.map((item) => (
              <div className="cart-content" key={item._id}>
                <img className="cart-img" src={item.image}></img>
                <h3>{item.brand}</h3>
                <h3>{item.model}</h3>
                <h3>{item.price} USD</h3>
                <button className="remove-from-cart" onClick={this.handleClick}>
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-summary">
              <h3>Summary</h3>
              <h3>
                Total:{" "}
                {this.state.cart.reduce((total, item) => total + item.price, 0)}{" "}
                USD
              </h3>
            </div>
            <div className="cart-buttons">
              <button>Checkout</button>
              <button>
                <Link className="cart-links" to={"/shop"}>
                  Continue shopping
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <h3 className="empty-cart">Your cart is empty</h3>
        )}
      </div>
    );
  }
}
