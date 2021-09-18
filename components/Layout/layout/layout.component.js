import Header from "../header/header.component.jsx";
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
  }

  render() {
    return (
      <>
        <Header
          isHome={this.props.isHome ? this.props.isHome : false}
          isLoading={this.props.isLoading}
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

export default Layout