import axios from "axios";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { SERVER_HOST } from "../config/global_constants";
import LinkInClass from "./LinkInClass";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogged: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    axios.defaults.withCredentials = true;
    axios
      .post(
        `${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`
      )
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log("User logged in successfully");
            sessionStorage.username = res.data.username;
            sessionStorage.accessLevel = res.data.accessLevel;
            sessionStorage.email = this.state.email;

            this.setState({ isLogged: true });
          }
        } else {
          console.log("Login failed");
        }
      });
  };

  render() {
    return (
      <div className="login-form">
        <form>
          <label>
            <img src={require("../images/login.png")} className="login-img" />
            Sign in
          </label>
          {console.log(this.state.isLogged)}
          {this.state.isLogged ? <Redirect to="/shop" /> : null}

          <label htmlFor="username"></label>
          <input
            type="text"
            name="email"
            id="username"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <LinkInClass
            value="Sign in"
            className="normal-button"
            onClick={this.handleSubmit}
          />
          <Link className="register-link" to="/register">
            {" "}
            Don't have account? Register now!{" "}
          </Link>
        </form>
      </div>
    );
  }
}
