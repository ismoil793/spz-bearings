import Header from "../header/header.component";
import Footer from "../footer/footer.componenet";
import React from "react";
import {connect} from "react-redux";
import {fetchCart} from "../../../redux/actions/cart"
import { fetchCompare } from "../../../redux/actions/compare";
import HeaderSecondary from "../header/headersecondary";

class Layout extends React.Component {
 
  state = {
    cartNumber: 0,
    compareNumber: 0
 };

  componentDidMount() {
    if (this.props.cart.cart && !this.props.cart.cart.items) {
      this.props.fetchCart();
   }
  }



  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.cart.cart && nextProps.cart.cart.items) {
       return {
          cartNumber: nextProps.cart.cart.total_count,
       }
    }
    return null
 }

  render() {
    return (
      <>
        <Header
          compareNumber={this.props.compareNumber}
          cartNumber={this.props.cartNumber}
          isHome={this.props.isHome ? this.props.isHome : false}
        />
        { this.props.isHome ? null : <HeaderSecondary title={this.props.title} pageInfo={this.props.pageInfo} /> }
        {/* <YMInitializer accounts={[61408678]} options={{webvisor: true}}/> */}
        {this.props.children}
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setProductCategory: (obj) => dispatch(actions.setProductCategory(obj)),
  fetchCart: () => dispatch(fetchCart()),
  fetchCompare: () => dispatch(fetchCompare())
});

function mapStateToProps(state) {
  return {
     cart: state.cart,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)