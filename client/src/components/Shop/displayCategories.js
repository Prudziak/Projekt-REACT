import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DisplayCategories extends Component {
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
            <Link to={`/shoes/${button}`} key={button}>
              <button className="category-button"> {button}</button>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
