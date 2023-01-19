import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import { Redirect } from "react-router-dom";

export default class DeleteProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_id: sessionStorage.current_id,
      redirect: false,
    };
  }

  handleClick = () => {
    axios
      .delete(`${SERVER_HOST}/shoes/${this.state.current_id}`)
      .catch((err) => console.log(err));

    if (sessionStorage.getItem("cart")) {
      let cart = JSON.parse(sessionStorage.getItem("cart"));
      console.log(cart);
      let updated = cart.filter((item) => {
        return item._id != this.state.current_id;
      });
      console.log(updated);
      sessionStorage.setItem("cart", JSON.stringify(updated));
    }

    this.setState({ redirect: true });
  };

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/shop" /> : null}
        <button className="red-button" onClick={this.handleClick}>
          Remove product
        </button>
      </div>
    );
  }
}
