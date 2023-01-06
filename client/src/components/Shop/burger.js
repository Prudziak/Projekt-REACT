import { Component } from "react";

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
    const menuItems = ["Home", "About", "Contact", "Login"];

    return (
      <div className="burger">
        <button onClick={this.handleClick}></button>
        {this.state.menuOpen && (
          <ul>
            {menuItems.map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
