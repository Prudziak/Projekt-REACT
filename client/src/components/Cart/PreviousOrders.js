import React, { Component } from "react";

import axios from "axios";

import { SERVER_HOST } from "../../config/global_constants";

export default class PreviousOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      buyer_email: sessionStorage.getItem("email"),
    };
  }

  componentDidMount() {
    axios.get(`${SERVER_HOST}/sales/${this.state.buyer_email}`).then((res) => {
      this.setState({
        orders: res.data,
      });
    });
  }

  render() {
    return (
      <div className="prev-orders">
        <h3 className="order-head">Previous Orders</h3>
        {this.state.orders.length === 0 ? (
          <p>You have no previous orders</p>
        ) : (
          <table className="table">
            <thead className="t-head">
              <tr>
                <th>Order ID</th>
                <th>Buyer Email</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {this.state.orders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.orderID}</td>
                    <td>{order.buyer_email}</td>
                    <td>{order.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
