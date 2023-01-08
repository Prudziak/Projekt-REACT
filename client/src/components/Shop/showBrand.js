import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class displayCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        { name: "Button 1" },
        { name: "Button 2" },
        { name: "Button 3" },
        { name: "Button 4" },
        { name: "Button 5" },
        { name: "Button 6" },
        { name: "Button 7" },
        { name: "Button 8" },
      ],
    };
  }

  render() {
    return (
      <div>
        {this.state.buttons.map((button) => (
          <Link to={`/products/${button.name}`} key={button.name}>
            <button>{button.name}</button>
          </Link>
        ))}
      </div>
    );
  }
}

class displayProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/products")
      .then((res) => this.setState({ products: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { match } = this.props;
    const { products } = this.state;
    const filteredProducts = products.filter(
      (product) => product.brand === match.params.buttonName
    );

    return (
      <div>
        {filteredProducts.map((product) => (
          <div key={product._id}>{product.name}</div>
        ))}
      </div>
    );
  }
}

export default displayProduct;
