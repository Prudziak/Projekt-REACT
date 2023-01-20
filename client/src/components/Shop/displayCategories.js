import React, { Component } from "react";
import { Link } from "react-router-dom";
import DisplayProductPage from "./displayProduct";

export default class DisplayCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_category: "",
    };
  }

  render() {
    const buttons = [
      "Nike",
      "Vans",
      "Adidas",
      "Converse",
      "Air Jordan",
      "Puma",
      "New Balance",
      "Others",
    ];

    return (
      <div className="display-categories">
        <div className="display-categories-title">
          <label className="prod_label">Categories</label>
        </div>
        <div className="display-categories-buttons">
          {buttons.map((button) => (
            <Link
              to={{
                pathname: `/shoes/${button}`,
                // query: { current_category: button },
              }}
              key={button}
            >
              <button
                onClick={() => {
                  this.state.current_category = button;
                  sessionStorage.setItem("current_category", button);
                }}
                className="category-button"
              >
                {" "}
                {button}
              </button>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
