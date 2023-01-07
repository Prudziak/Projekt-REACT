import { Component } from "react";
import { Link } from "react-router-dom";

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
    const menuItems = ["Login", "Register", "Cart"];

    return (
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
