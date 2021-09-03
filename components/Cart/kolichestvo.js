import React from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default class Kolichestvo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      id: null,
      stock_quantity:null,
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.quantity,
      id: this.props.id,
      stock_quantity: this.props.stock_quantity
    });
  }
  componentWillReceiveProps(newProps){
    this.setState({
      value: newProps.quantity,
      id: newProps.id,
      stock_quantity: newProps.stock_quantity
    });
  }

  sendData = e => {
    this.props.callback(this.state.value, this.state.id);
  };

  Increment = e => {
    const notyf = new Notyf();
    if (this.state.value < this.state.stock_quantity) {
      e.preventDefault();
      this.setState({ value: this.state.value + 1 }, () => {
        this.sendData();
      });
    } else {
      e.preventDefault();
      notyf.error(
        `Количество данного товара не может быть более ${this.props.stock_quantity}`
      );
    }
  };

  Decrement = e => {
    if (this.state.value > 1) {
      e.preventDefault();
      this.setState({ value: this.state.value - 1 }, () => {
        this.sendData();
      });
    } else {
      e.preventDefault();
   }
  };

  render() {
    console.log(this.state.value)
    return (
      <>
        <div className="row quantity-input">
          <button
            className="quantity-input__modifier quantity-input__modifier--left"
            onClick={this.Decrement}
          >
            -
          </button>
          <input
            className="quantity-input__screen"
            type="text"
            value={this.state.value}
            readOnly
          />
          <button
            className="quantity-input__modifier quantity-input__modifier--right"
            onClick={this.Increment}
          >
            +
          </button>
        </div>
      </>
    );
  }
}
