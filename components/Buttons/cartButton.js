import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import url from "../url";
import { connect } from "react-redux"
import { addToCart, deleteFromCart } from "../../redux/actions/cart"
import { notifySuccess, notifyWarn } from "../../helpers/NotyfBtn/NotyBtn";

 class CartButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      cartproducts: []
    };
  }

  
  moyMetod = (e) => {
   e.preventDefault()
   if (!this.state.toggle) {
    this.props.addToCart(this.props.item_shop_id, 1)
   }
   else this.props.deleteFromCart(this.props.item_shop_id)
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }), () => {
      if (this.state.toggle === true) {
        notifySuccess(`Товар ${this.props.product_name} добавлен в корзину`)}
        else {
          notifyWarn(`Товар ${this.props.product_name} удален с корзины`)
        }
    });
  
 };

  AddCart = () => {
    const notyf = new Notyf();
    const cookies = new Cookies();
     
    axios({
      method: "post",
      url: `${url}/api/cart/add`,
      data: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        quantity: 1,
        item_shop_id: this.props.item_shop_id
      }
    })
      .then(response => {

        this.setState(prevState => ({
          toggle: !prevState.toggle
        }));
        if (this.state.toggle == true) {
          notyf.success(`Товар ${this.props.product_name} добавлен в корзину`);
          // this.props.handleCompare()
        } else {
          notyf.error(`Товар ${this.props.product_name} удален с корзины`);
        }
        this.setState({ cartproducts: response.data.data });

        // event.preventDefault();
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
    event.preventDefault();
  };
  render() {
    return (
      <>
        {!this.state.toggle ? (
          <div className="d-none d-xl-block prodcut-add-cart">
            <a
              onClick={this.moyMetod}
              href="#"
              className="btn-add-cart btn-danger transition-3d-hover"
            >
              <i className="ec ec-add-to-cart"></i>
            </a>
          </div>
        ) : (
          <div className="d-none d-xl-block prodcut-add-cart">
            <a
              onClick={this.moyMetod}
              href="#"
              className="btn-add-cart btn-success transition-3d-hover"
            >
              <i className="ec ec-add-to-cart"></i>
            </a>
          </div>
        )}
      </>
    );
  }
}



const mapStateToProps = (state, ownProps) => {
  return {
     cart: state.cart
  }
};

const mapDispatchToProps = dispatch => ({
  addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
  deleteFromCart: (id) => dispatch(deleteFromCart(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(CartButton)