import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import { Link, withRouter } from "react-router-dom";

class DisplayProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [],
      current_category: this.props.location.query.current_category,
      current_id: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/shoes`)
      .then((res) => {
        const shoes = res.data;
        const nikeShoes = shoes.filter(
          (shoe) => shoe.brand === this.state.current_category
        );
        this.setState({ shoes: nikeShoes });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="display">
        {this.state.shoes.map((shoe) => (
          <Link
            className="prod-link"
            to={{
              pathname: `/shoes/prod/${shoe._id}`,
              query: { current_id: shoe._id },
            }}
            key={shoe}
          >
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
        ))}
      </div>
    );
  }
}

export default withRouter(DisplayProductPage);
