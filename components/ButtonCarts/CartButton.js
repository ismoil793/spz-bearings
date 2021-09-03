import React from 'react'
import Cookies from "universal-cookie";
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import url from '../url';
import { connect } from "react-redux"
import { addToCart } from "../../redux/actions/cart"


class ButtonProductCartHome extends React.Component {

  moyMetod = () => {
   let inCart = this.props.cart.cart.items.findIndex(el => el.item_shop_id === this.props.productss_id);
    if (inCart > -1) {
       notyf.warning('Сорри')
    } else {
       this.props.addToCart(this.props.productss_id, 1)
       notyf.success('Ваш товар в корзине');
    }
 };

  render() {
     return (
      <>
        <button
          onClick={this.moyMetod}
          type="button" className="product_cart_button"><a>В корзину</a></button>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
     cart: state.cart
  }
};

const mapDispatchToProps = dispatch => ({
  addToCart: (id, quantity) => dispatch(addToCart(id, quantity))
});


export default connect(mapStateToProps, mapDispatchToProps)(ButtonProductCartHome)