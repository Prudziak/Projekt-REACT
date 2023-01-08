import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { SERVER_HOST } from "../../config/global_constants";

export default class DisplayShoes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoes: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/shoes`)
      .then((res) => {
        this.setState({ shoes: res.data });
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
          {this.state.shoes.map((shoe) =>
            shoe.sold_pairs >= 350 ? (
              <Link className="prod-link" to={`/shoes/prod/${shoe._id}`}>
                <div className="shoe_display" key={shoe}>
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
            ) : null
          )}
        </div>
      </div>
    );
  }
}
