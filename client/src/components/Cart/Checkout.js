import React, { Component } from "react";
import PayPalButton from "react-paypal-express-checkout";
import { SANDBOX_CLIENT_ID } from "../../config/global_constants";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default class Checkout extends Component {
  render() {
    const environment = "sandbox";
    const client_id = { sandbox: SANDBOX_CLIENT_ID };

    return (
      <PayPalScriptProvider options={{ "client-id": SANDBOX_CLIENT_ID }}>
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
              const name = details.payer.name.given_name;
              alert(
                `Transaction completed by ${name}\nYour order ID: ${data.orderID}`
              );
            });
          }}
          onCancel={(data) => {
            alert("Transaction cancelled", data);
          }}
          onError={(err) => {
            alert("Transaction error", err);
          }}
        />
      </PayPalScriptProvider>
    );
  }
}
