import React, { Component } from "react";
import { SANDBOX_CLIENT_ID } from "../../config/global_constants";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../../config/global_constants";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToMessage: false,
      messageType: null,
      orderID: null,
    };
  }

  render() {
    const redirect = `/message/${this.state.messageType}/${this.state.orderID}`;
    return (
      <PayPalScriptProvider options={{ "client-id": SANDBOX_CLIENT_ID }}>
        {this.state.redirectToMessage ? <Redirect to={redirect} /> : null}
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.props.total,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              !sessionStorage.email ? (sessionStorage.email = "guest") : null;
              axios
                .post(
                  `${SERVER_HOST}/sales/${data.orderID}/${sessionStorage.email}/${this.props.products}/${this.props.total}`
                )
                .then((res) => {
                  sessionStorage.cart = JSON.stringify([]);
                  this.setState({
                    redirectToMessage: true,
                    messageType: "success",
                    orderID: data.orderID,
                  });
                });
            });
          }}
          onCancel={(data) => {
            this.setState({ redirectToMessage: true, messageType: "cancel" });
          }}
          onError={(err) => {
            this.setState({ redirectToMessage: true, messageType: "error" });
            console.log(err);
          }}
        />
      </PayPalScriptProvider>
    );
  }
}
