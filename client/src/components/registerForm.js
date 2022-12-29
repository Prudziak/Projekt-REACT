import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class RegisterForm extends Component {
  render() {
    return (
      <div className="register-form">
        <h1
          onClick={() => {
            window.location.href = "http://localhost:3000/";
          }}
        >
          Logo
        </h1>
        <form>
          <label>Register</label>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <label htmlFor="email"></label>
          <input type="email" name="email" id="email" placeholder="Email" />
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="FirstName"></label>
          <input
            type={"text"}
            name={"FirstName"}
            id={"FirstName"}
            placeholder={"First Name"}
          />
          <label htmlFor="LastName"></label>
          <input
            type={"text"}
            name={"LastName"}
            id={"LastName"}
            placeholder={"Last Name"}
          />
          <label htmlFor="Address"></label>
          <input
            type={"text"}
            name={"Address"}
            id={"Address"}
            placeholder={"Address"}
          />
          <button type="submit">Register</button>
          <Link className="login-link" to="/login">
            {" "}
            Go back to login{" "}
          </Link>
        </form>
      </div>
    );
  }
}
