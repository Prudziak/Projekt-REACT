import React, { Component } from "react";

import axios from "axios";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    // Fetch the product from the database using an axios GET request and the product ID
    axios
      .get(`/shoes/${this.props.productId}`)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.product.name}</h1>
        <p>{this.state.product.description}</p>
        <p>Price: {this.state.product.price}</p>
      </div>
    );
  }
}
