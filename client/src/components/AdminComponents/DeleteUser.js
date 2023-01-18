import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";

export default class DeleteUser extends Component {
  onClick = () => {
    axios.delete(`${SERVER_HOST}/users/${this.props.id}`);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>Delete user</button>
      </div>
    );
  }
}
