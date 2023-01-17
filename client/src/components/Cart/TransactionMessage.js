import React, { Component } from "react";

export default class TransactionMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      head: null,
      message: null,
      button: null,
    };
  }

  componentDidMount() {
    if (this.props.match.params.messageType === "success") {
      this.setState({
        head: "Transaction successful!",
        message: "Your order has been placed. Thank you for your purchase!",
        button: "ok-button",
      });
    } else if (this.props.match.params.messageType === "cancel") {
      this.setState({
        head: "Transaction cancelled",
        message: "You have cancelled your transaction. Please try again.",
        button: "err-button",
      });
    } else if (this.props.match.params.messageType === "error") {
      this.setState({
        head: "Transaction error",
        message:
          "There was an error processing your transaction. Please try again.",
        button: "err-button",
      });
    }
  }

  render() {
    return (
      <div className="message-container">
        <h3>{this.state.head}</h3>
        <p>{this.state.message}</p>
        {this.props.match.params.messageType === "success" ? (
          <p>Your order ID is {this.props.match.params.orderID}</p>
        ) : null}
        <button
          className={this.state.button}
          onClick={() => {
            window.location.href = "http://localhost:3000/cart";
          }}
        >
          OK
        </button>
      </div>
    );
  }
}
