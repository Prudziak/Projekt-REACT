import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import LinkInClass from "./LinkInClass";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      isRegistered: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    let url = `${SERVER_HOST}/users/register/${this.state.username}/${this.state.email}/${this.state.password}/${this.state.firstname}/${this.state.lastname}`;
    axios
      .post(url)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log("User logged in");
            sessionStorage.username = res.data.username;
            sessionStorage.accessLevel = res.data.accessLevel;
            sessionStorage.email = this.state.email;
            this.setState({ isRegistered: true });
          }
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="register-form">
        <form noValidate={true}>
          {this.state.isRegistered ? <Redirect to="/shop" /> : null}
          <label>Register</label>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            ref={(input) => {
              this.inputToFocus = input;
            }}
          />
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label htmlFor="FirstName"></label>
          <input
            type={"text"}
            name={"firstname"}
            placeholder={"First Name"}
            value={this.state.firstname}
            onChange={this.handleChange}
          />
          <label htmlFor="LastName"></label>
          <input
            type={"text"}
            name={"lastname"}
            placeholder={"Last Name"}
            value={this.state.lastname}
            onChange={this.handleChange}
          />
          <LinkInClass
            value="Register"
            className="normal-button"
            onClick={this.handleSubmit}
          />
          <Link className="login-link" to="/login">
            {" "}
            Go back to login{" "}
          </Link>
        </form>
      </div>
    );
  }
}
