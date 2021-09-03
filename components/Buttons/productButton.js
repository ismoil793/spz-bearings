import React from "react";
import { connect } from "react-redux"
import { fetchCart, addToCart } from "../../redux/actions/cart";
import { notifySuccess, notifyWarn } from "../../helpers/NotyfBtn/NotyBtn";
import Link from "next/link";
import { withRouter } from "next/router";

class ProductButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      cartproducts: []
    };
  }


  AddCart = (e) => {
    e.preventDefault()
     this.props.addToCart(this.props.item_shop_id, this.props.selectedNumber)
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('updating')
    if (prevProps.router.query.product !== this.props.router.query.product) {
      if(!!(this.props.cart.cart.items?.filter(el=> el.product.slug === this.props.router.query.product).length)) {
        this.setState({toggle: true})
      }
      else this.setState({toggle: false})
    }
  }

  // AddCart = () => {
  //   const notyf = new Notyf();
  //   const cookies = new Cookies();
  //   axios({
  //     method: "post",
  //     url: `${url}/api/cart/add`,
  //     data: {
  //       device_token: cookies.get("device_token"),
  //       device_type: cookies.get("device_type"),
  //       quantity: this.props.selectedNumber.value,
  //       item_shop_id: this.props.item_shop_id
  //     }
  //   })
  //     .then(response => {
  //       // this.props.handleChild()
  //       this.setState(prevState => ({
  //         toggle: !prevState.toggle
  //       }));
  //       if (this.state.toggle == true) {
  //         notyf.success(`Товар ${this.props.product_name} добавлен в корзину`);
  //         // this.props.handleCompare()
  //       } else {
  //         notyf.error(`Товар ${this.props.product_name} удален в корзину`);
  //       }
  //       this.setState({ cartproducts: response.data.data });

  //       // event.preventDefault();
  //     })
  //     .catch(error => {
  //       notyf.error(error.data.message);
  //     });
  //   event.preventDefault();
  // };
  render() {
    return (
      <>
        {!this.state.toggle ? (
            <div className="ml-md-3">
            <a onClick={this.AddCart} class="btn px-5 btn-primary-dark transition-3d-hover"><i className="ec ec-add-to-cart mr-2 font-size-20"></i> В корзину</a>
        </div>
        ) : (
            <Link href="/cart">
              <div className="ml-md-3">
                  <a className="btn px-5 btn-success transition-3d-hover"><i className="ec ec-add-to-cart mr-2 font-size-20"></i> Оформить заказ</a>
              </div>
            </Link>
        )}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductButton))