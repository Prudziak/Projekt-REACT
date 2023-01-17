import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../../config/global_constants";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      model: "",
      colour: "",
      price: "",
      description: "",
      image: "",
      stock: "",
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      brand: this.state.brand,
      model: this.state.model,
      colour: this.state.colour,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image,
      stock: this.state.stock,
    };

    axios.post(`${SERVER_HOST}/shoes`, product).then((res) => {
      console.log(res.data);
    });
  };
  render() {
    return (
      <form className="add-shoe-form" onSubmit={this.handleSubmit}>
        <h2>Add new product</h2>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={this.state.brand}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            name="model"
            value={this.state.model}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Colour:
          <input
            type="text"
            name="colour"
            value={this.state.colour}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Link to image:
          <input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={this.state.stock}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button type="submit">
          <Link className="add-prod-link" to="/shop">
            Add product
          </Link>
        </button>
      </form>
    );
  }
}
