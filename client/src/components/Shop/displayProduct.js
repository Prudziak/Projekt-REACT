import React, { Component } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";
import { Link } from "react-router-dom";
import Logout from "./logout";
import { ACCESS_LEVEL_GUEST } from "../../config/global_constants";

class DisplayProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoes: [],
      current_category: sessionStorage.getItem("current_category"),
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
      <div className="page">
        {sessionStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
          <div className="welcome">
            <h5>Welcome {sessionStorage.username}</h5>
            <Logout />
          </div>
        ) : null}
        <div className="all-shoes">
          {this.state.shoes.map((shoe) => (
            <Link
              onClick={() => {
                sessionStorage.setItem("current_id", shoe._id);
              }}
              className="prod-link"
              to={{
                pathname: `/shoes/prod/${shoe._id}`,
              }}
              key={shoe._id}
            >
              <div className="shoe_display">
                <div className="card2">
                  <img src={shoe.image} alt="shoe" />
                  <div className="container2">
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

export default DisplayProductPage;
