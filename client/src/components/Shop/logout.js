import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { ACCESS_LEVEL_GUEST, SERVER_HOST } from "../../config/global_constants";
import LinkInClass from "../LinkInClass";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: true,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${SERVER_HOST}/users/logout`)
      .then((res) => {
        sessionStorage.accessLevel = ACCESS_LEVEL_GUEST;
        sessionStorage.username = "GUEST";
        sessionStorage.email = "guest";
        this.setState({ isLogged: false });
      })
      .catch((err) => {
        console.log("Logout failed");
      });
  };

  render() {
    return (
      <div className="logout-button">
        {!this.state.isLogged ? <Redirect to="/login" /> : null}

        <LinkInClass
          value="Log out"
          className="red-button"
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}
