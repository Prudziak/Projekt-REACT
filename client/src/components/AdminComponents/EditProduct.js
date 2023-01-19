import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import { Redirect } from "react-router-dom";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: ``,
      model: ``,
      colour: ``,
      price: ``,
      description: ``,
      image: ``,
      stock: ``,
      current_id: sessionStorage.current_id,
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/shoes/${this.state.current_id}`)
      .then((res) => {
        this.setState({
          brand: res.data.brand,
          model: res.data.model,
          colour: res.data.colour,
          price: res.data.price,
          description: res.data.description,
          image: res.data.image,
          stock: res.data.stock,
          redirect: false,
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedShoe = {
      brand: this.state.brand,
      model: this.state.model,
      colour: this.state.colour,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image,
      stock: this.state.stock,
    };

    axios
      .put(`${SERVER_HOST}/shoes/${this.state.current_id}`, updatedShoe)
      .catch((err) => console.log(err));

    this.setState({ redirect: true });
  };

  render() {
    return (
      <form className="add-shoe-form" onSubmit={this.handleSubmit}>
        {this.state.redirect ? (
          <Redirect to={`/shoes/prod/${this.state.current_id}`} />
        ) : null}
        <h2>Edit product</h2>
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
        <button className="add-prod-link" type="submit">
          Submit
        </button>
      </form>
    );
  }
}
