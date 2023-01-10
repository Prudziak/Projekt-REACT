import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ACCESS_LEVEL_GUEST } from "../../config/global_constants";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import LinkInClass from "../LinkInClass";

export default class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      loggedOut: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${SERVER_HOST}/users/logout`)
      .then((res) => {
        sessionStorage.clear();
        sessionStorage.accessLevel = ACCESS_LEVEL_GUEST;
        this.setState({ loggedOut: true });
      })
      .catch((err) => {
        console.log("Logout failed");
      });
  };

  render() {
    return sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
      <div className="burger">
        <button onClick={this.handleClick}></button>
        {this.state.menuOpen && (
          <ul>
            <li>
              <Link className="cart-link" to="/cart">
                {" "}
                Cart{" "}
              </Link>
            </li>
          </ul>
        )}
      </div>
    ) : (
      <div className="burger">
        <button onClick={this.handleClick}></button>
        {this.state.menuOpen && (
          <ul>
            <li>
              <Link className="burger-link" to="/login">
                {" "}
                Login{" "}
              </Link>
              <Link className="burger-link" to="/register">
                {" "}
                Register{" "}
              </Link>
              <Link className="cart-link" to="/cart">
                {" "}
                Cart{" "}
              </Link>
            </li>
          </ul>
        )}
      </div>
    );
  }
}
