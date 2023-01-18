import React, { Component } from "react";
import axios from "axios";

import { SERVER_HOST } from "../../config/global_constants";

export default class AddAdmin extends Component {
  onClick = () => {
    axios.post(`${SERVER_HOST}/users/add_admin`);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>Add admin</button>
      </div>
    );
  }
}
