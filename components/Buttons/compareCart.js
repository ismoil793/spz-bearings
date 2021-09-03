import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import url from "../url";
import { connect } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/actions/cart";


class CompareButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      cartproducts: []
    };
  }

  notyf = new Notyf();
  addedToCartCheck = () => {
    return !!this.props.cart.items.find(el => el.item_shop_id === this.props.item_shop_id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cart !== prevProps.cart) {
      let checkButton = this.addedToCartCheck();
      if (this.state.toggle !== this.addedToCartCheck());
      this.setState({toggle: checkButton})
    }
    if (this.state.toggle !== prevState.toggle) {
     if (this.state.toggle) this.notyf.success(`Товар добавлен в корзину`);
     else this.notyf.error(`Товар удален c корзины`);
    }

  }

  DeleteIt = () => {
    event.preventDefault();
    this.props.deleteFromCart(this.props.item_shop_id)
  }



  AddCart = () => {
    this.props.addToCart(this.props.item_shop_id, 1)
    event.preventDefault();
  };
  render() {
    return (
      <>
        {!this.addedToCartCheck()  ? (
           <div class=""><a onClick={this.AddCart} class="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-3 px-xl-5">В корзину</a></div>
        ) : (
          <div className="d-none d-xl-block prodcut-add-cart">
          <div class=""><a onClick={this.DeleteIt} class="btn btn-success mb-3 mb-md-0 font-weight-normal px-5 px-md-3 px-xl-5">Удалить с корзины</a></div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
  deleteFromCart: (id) => dispatch(deleteFromCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompareButton)