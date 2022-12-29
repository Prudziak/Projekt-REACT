import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LoginForm extends Component {
  render() {
    return (
      <div className="login-form">
        <h1
          onClick={() => {
            window.location.href = "http://localhost:3000/";
          }}
        >
          Logo
        </h1>
        <form>
          <label>Login</label>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <Link className="register-link" to="/register">
            {" "}
            Don't have account? Register now!{" "}
          </Link>
        </form>
      </div>
    );
  }
}
