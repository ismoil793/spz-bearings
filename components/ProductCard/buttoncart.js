import React from 'react'
import { connect } from "react-redux"
import { addToCart } from "../../redux/actions/cart"
import { notifySuccess } from "../../helpers/NotyfBtn/NotyBtn";
class ButtonProductCart extends React.Component {

constructor(props){
  super(props)
}

  moyMetod = (e) => {
    e.preventDefault()
    this.props.addToCart(this.props.item_shop_id, this.props.selectedNumber);
    notifySuccess(`Товар ${this.props.product_name} добавлен в корзину`)
  };


    render() { 
      return (
         <button   
          onClick={this.moyMetod} 
          type="button" 
          className="cart_button">
           <a>В корзину</a>
         </button> 
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

    export default connect(mapStateToProps, mapDispatchToProps)(ButtonProductCart)