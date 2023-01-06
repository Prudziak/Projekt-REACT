import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

import axios from "axios";

import LinkInClass from "../LinkInClass";

import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../../config/global_constants";

export default class AddProd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: "",
      model: "",
      colour: "",
      price: "",
      description: "",
      //selectedFiles: null,
      redirectToDisplayAllCars: false,
      wasSubmittedAtLeastOnce: false,
    };
  }

  componentDidMount() {
    this.inputToFocus.focus();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //   handleFileChange = (e) => {
  //     this.setState({ selectedFiles: e.target.files });
  //   };

  handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("brand", this.state.brand);
    formData.append("model", this.state.model);
    formData.append("colour", this.state.colour);
    formData.append("price", this.state.price);
    formData.append("description", this.state.description);

    // if (this.state.selectedFiles) {
    //   for (let i = 0; i < this.state.selectedFiles.length; i++) {
    //     formData.append("carPhotos", this.state.selectedFiles[i]);
    //   }
    // }

    axios
      .post(`${SERVER_HOST}/shoes`, formData, {
        headers: {
          authorization: localStorage.token,
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.setState({ redirectToDisplayAllCars: true });
      })
      .catch((err) => {
        this.setState({ wasSubmittedAtLeastOnce: true });
      });
  };

  render() {
    let errorMessage = "";
    if (this.state.wasSubmittedAtLeastOnce) {
      errorMessage = (
        <div className="error">
          Error: All fields must be filled in
          <br />
        </div>
      );
    }

    return (
      <div className="form-container">
        {this.state.redirectToDisplayAllCars ? <Navigate to="/shop" /> : null}

        {errorMessage}

        <Form>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              ref={(input) => {
                this.inputToFocus = input;
              }}
              type="text"
              name="brand"
              value={this.state.brand}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={this.state.model}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="colour">
            <Form.Label>Colour</Form.Label>
            <Form.Control
              type="text"
              name="colour"
              value={this.state.colour}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <br />
          <br />
          <LinkInClass
            value="Add"
            className="green-button"
            onClick={this.handleSubmit}
          />
          <Link className="red-button" to={"/shop"}>
            Cancel
          </Link>
        </Form>
      </div>
    );
  }
}
