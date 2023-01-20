import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import DeleteUser from "./DeleteUser";
import { Link } from "react-router-dom";
import Logout from "../Shop/logout";
import { ACCESS_LEVEL_GUEST } from "../../config/global_constants";

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get(`${SERVER_HOST}/users`).then((res) => {
      const filtered = res.data.filter((user) => {
        return user.accessLevel != 2;
      });
      this.setState({ users: filtered });
    });
  }

  componentDidUpdate() {
    axios.get(`${SERVER_HOST}/users`).then((res) => {
      const filtered = res.data.filter((user) => {
        return user.accessLevel != 2;
      });
      this.setState({ users: filtered });
    });
  }

  render() {
    return (
      <div className="panel-page">
        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
          <div className="welcome">
            <h5>Welcome {sessionStorage.username}</h5>
            <Logout />
          </div>
        ) : null}
        <h2 className="panel-page-title">Admin panel</h2>
        <div className="manage-users">
          <h2>Manage users</h2>
          {this.state.users.length > 0 ? (
            <div className="user">
              {this.state.users.map((user) => (
                <div className="user-info" key={user._id}>
                  <div>
                    <h2>ID</h2>
                    <p>{user._id}</p>
                  </div>
                  <div>
                    <h2>Username</h2>
                    <p>{user.username}</p>
                  </div>
                  <div>
                    <h2>Email</h2>
                    <p>{user.email}</p>
                  </div>
                  <DeleteUser id={user._id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-users">
              <p>No users registered</p>
            </div>
          )}
        </div>
        <div className="manage-products">
          <h2>Manage products</h2>
          <Link to="/add-product">
            <button className="add-product">Add product</button>
          </Link>
        </div>
      </div>
    );
  }
}
