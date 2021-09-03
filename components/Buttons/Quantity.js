import React from "react";
import { connect } from "react-redux"
import { fetchCart, addToCart } from "../../redux/actions/cart";

class Quantity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.quantity
    };
  }

  Increment = e => {

    if (this.state.value < 10 ) {
      e.preventDefault();
      this.setState({ value: this.state.value + 1 }, () => {
        this.props.addToCart(this.props.id, this.state.value)
      });
    }
  };

  Decrement = e => {
    if (this.state.value > 1) {
      e.preventDefault();
      this.setState({ value: this.state.value - 1 }, () => {
        this.props.addToCart(this.props.id, this.state.value)
      });
    }
  };

  render() {
    console.log(this.props)
    return (
      <>
                    <div className="border rounded-pill py-2 px-3 border-color-1">
                                          <div className="js-quantity row align-items-center">
                                              <div className="col">
                                                  <input className="js-result form-control h-auto border-0 rounded p-0 shadow-none" type="text" value={this.state.value}/>
                                              </div>
                                              <div className="col-auto pr-1">
                                                  <a onClick={this.Decrement} className="js-minus btn btn-icon btn-xs btn-outline-secondary rounded-circle border-0" href="javascript:;">
                                                      <small className="fas fa-minus btn-icon__inner"></small>
                                                  </a>
                                                  <a  onClick={this.Increment} className="js-plus btn btn-icon btn-xs btn-outline-secondary rounded-circle border-0" href="javascript:;">
                                                      <small className="fas fa-plus btn-icon__inner"></small>
                                                  </a>
                                              </div>
                                          </div>
                                      </div>
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  addToCart: (id, quantity) => dispatch(addToCart(id, quantity))
});


export default connect(mapStateToProps, mapDispatchToProps)(Quantity)