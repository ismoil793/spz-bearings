import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import url from "../url";
import { connect } from "react-redux";
import { addToCart, deleteFromCart, fetchCart } from "../../redux/actions/cart";

class FavouriteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      cartproducts: []
    };
  }
  notyf = new Notyf();
  addedToCartCheck = () => {
    return !!this.props.cart.cart.items.find(el => el.item_shop_id === this.props.item_shop_id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cart !== prevProps.cart) {
      let checkButton = this.addedToCartCheck();
      if (this.state.toggle !== this.addedToCartCheck());
      this.setState({toggle: checkButton})
    }
    if (this.state.toggle !== prevState.toggle) {
     if (this.state.toggle) this.notyf.success(`Товар ${this.props.product.name} добавлен в корзину`);
     else this.notyf.error(`Товар ${this.props.product.name} удален c корзины`);
    }

  }


  AddCart = () => {
    event.preventDefault();
    this.props.addToCart(this.props.item_shop_id, 1)
  };

  DeleteIt = () => {
    event.preventDefault();
    this.props.deleteFromCart(this.props.item_shop_id)
  }

  render() {
    return (
      <>
        {!this.addedToCartCheck() ? (
         <button onClick={this.AddCart} type="button" class="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-4 px-lg-5 w-100 w-md-auto">В корзину</button>
        ) : (
            <button onClick={this.DeleteIt} type="button" class="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-4 px-lg-5 w-100 w-md-auto">Удалить с корзины</button>
        )}
      </>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
    deleteFromCart: (id) => dispatch(deleteFromCart(id))
  }
}

export default connect(null, mapDispatchToProps)(FavouriteButton)