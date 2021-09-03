import React from "react";
import Link from "next/link";
import axios from "axios";
import DeleteButtonCart from "../../components/Cart/deleteButton";
import Cookies from "universal-cookie";
import url from "../url";
import onClickOutside from "react-onclickoutside";

import { connect } from "react-redux"
import { fetchCart, addToCart } from "../../redux/actions/cart";


class CartPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      isLoading: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.cart.cart && nextProps.cart.cart.items) {
      return { cart: nextProps.cart.cart, isLoading: false }
    }
    return null
  }

  callbackFunction = (childData1, childData2) => {
    this.props.addToCart(childData2, childData1);
  };



  handleClickOutside = evt => {
    this.props.hide(false)
   };


  render() {
    return (
      <div
        id="basicDropdownHover"
        className="cart-dropdown dropdown-menu dropdown-unfold border-top border-top-primary mt-3 border-width-2 border-left-0 border-right-0 border-bottom-0 left-auto right-0 u-unfold--css-animation slideInUp"
        aria-labelledby="basicDropdownHoverInvoker"
      >
        <ul className="list-unstyled px-3 pt-3">
          {this.state.cart.items
            ? this.state.cart.items.map(item => (
                <li className="border-bottom pb-3 mb-3">
                  <div className="">
                    <ul className="list-unstyled row mx-n2">
                      <li className="px-2 col-auto">
                        <img
                          className="img-fluid"
                          src={item.product.images[0].types.small_default}
                          alt={item.product.name}
                        />
                      </li>
                      <li className="px-2 col">
                        <h5 className="text-blue font-size-14 font-weight-bold pointer">
                           {item.product.name}
                        </h5>
                        <span className="font-size-14">
                          {item.quantity} × {item.total_with_discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум
                        </span>
                      </li>
                      <li className="px-2 col-auto">
                      <DeleteButtonCart  item_shop_id={item.item_shop_id}/>
                      </li>
                    </ul>
                  </div>
                </li>)) : null}
        </ul>
        <div className="flex-center-between px-4 pt-2">
          <Link href="/cart">
            <a className="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-4 px-lg-5">
              Корзина
            </a>
          </Link>
          <Link href="/checkout">
            <a className="btn btn-primary-dark-w ml-md-2 px-5 px-md-4 px-lg-5">
              Купить
            </a>
          </Link>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(CartPopup))