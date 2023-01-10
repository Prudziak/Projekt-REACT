import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { SERVER_HOST } from "../../config/global_constants";

export default class DisplayShoes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoes: [],
      current_id: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/shoes`)
      .then((res) => {
        const shoes = res.data;
        const bestsellers = shoes.filter((shoe) => shoe.sold_pairs >= 350);
        this.setState({ shoes: bestsellers });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="display-shoes">
        <div className="display-shoes-title">
          <label className="prod_label">Bestsellers</label>
        </div>
        <div className="shoe_card">
          {this.state.shoes.map((shoe) => (
            <Link
              className="prod-link"
              to={{
                pathname: `/shoes/prod/${shoe._id}`,
                query: { current_id: shoe._id },
              }}
              key={shoe._id}
            >
              <div className="shoe_display">
                <div className="card">
                  <img src={shoe.image} alt="shoe" />
                  <div className="container">
                    <h4>
                      <b>{shoe.brand}</b>
                    </h4>
                    <p className="shoe-p">{shoe.model}</p>
                    <p className="shoe-p">{shoe.colour}</p>
                    <p className="shoe-price">{shoe.price} USD</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
