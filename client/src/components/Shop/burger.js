import { Component } from "react";
import { Link } from "react-router-dom";
import {
  ACCESS_LEVEL_GUEST,
  ACCESS_LEVEL_NORMAL_USER,
} from "../../config/global_constants";

export default class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen,
    }));
  };

  render() {
    return sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
      <div className="burger">
        <button className="brgr-button" onClick={this.handleClick}>
          <img
            className="burger-image"
            src={require("../../images/burger.png")}
          />
        </button>
        {this.state.menuOpen && (
          <ul>
            <li>
              {sessionStorage.accessLevel > ACCESS_LEVEL_NORMAL_USER ? (
                <Link className="burger-link" to="/admin-panel">
                  {" "}
                  Admin{" "}
                </Link>
              ) : null}
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
        <button className="brgr-button" onClick={this.handleClick}>
          <img
            className="burger-image"
            src={require("../../images/burger.png")}
          />
        </button>
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
