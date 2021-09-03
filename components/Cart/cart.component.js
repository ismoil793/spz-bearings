import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import deleteButtonCart from "../../components/Cart/deleteButton";
import DeleteButtonCart from "../../components/Cart/deleteButton";
import Cookies from "universal-cookie";
import Kolichestvo from "./kolichestvo";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import url from "../url";
import { connect } from "react-redux"
import { fetchCart, addToCart } from "../../redux/actions/cart";
import Quantity from "../Buttons/Quantity";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

class Cart extends React.Component {
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

  render() {
    const { cart } = this.state;
   
    return (
      <>
      {this.state.isLoading ? (
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={"black"}
          loading={this.state.isLoading}
        />
      ) : (
      <main id="content" role="main" className="cart-page">
      <div className="container">
          <div className="mb-4">
              <h1 className="text-center">Корзина</h1>
          </div>
          <div className="mb-10 cart-table">
              <form className="mb-4" action="#" method="post">
                  <table className="table" cellspacing="0">
                      <thead>
                          <tr>
                              <th className="product-remove">&nbsp;</th>
                              <th className="product-thumbnail">&nbsp;</th>
                              <th className="product-name">Продукт</th>
                              <th className="product-price">Цена</th>
                              <th className="product-quantity w-lg-15">К-во</th>
                              <th className="product-subtotal">Всего</th>
                          </tr>
                      </thead>
                      <tbody>
                        {this.state.cart.items ? this.state.cart.items.map(item=> (
                          <tr className="">
                              <td className="text-center">
                               <DeleteButtonCart onDelete={this.UpdateCart} item_shop_id={item.item_shop_id}/>
                              </td>
                              <td className="d-none d-md-table-cell">
                                  <a><img className="img-fluid max-width-100 p-1 border border-color-1" src={item.product.images[0].types.small_default} alt={item.product.name}/></a>
                              </td>

                              <td data-title="Product">
                                  <a className="text-gray-90">{item.product.name}</a>
                              </td>

                              <td data-title="Price">
                                  <span className="">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</span>
                              </td>

                              <td data-title="Quantity">
                                  <span className="sr-only">К-во</span>
                                 
                        

                             <Quantity 
                               callback={this.callbackFunction}
                                quantity={item.quantity}
                                id={item.item_shop_id}
                                stock_quantity={item.stock_quantity}/>
                                 
                              </td>

                              <td data-title="Total">
                                  <span className="">{item.total_with_discount
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )} сум</span>
                              </td>
                          </tr>)) : null }
                                     
                          
                        
                          <tr>
                              <td colspan="6" className="border-top space-top-2 justify-content-center">
                                  <div className="pt-md-3">
                                      <div className="d-block d-md-flex flex-center-between">
                                          <div className="mb-3 mb-md-0 w-xl-40">
                                            
                                              <form className="js-focus-state">
                                                  <label className="sr-only" for="subscribeSrEmailExample1">Код купона</label>
                                                  <div className="input-group">
                                                      <input type="text" className="form-control" name="text" id="subscribeSrEmailExample1" placeholder="Введите код купона" aria-label="Coupon code" aria-describedby="subscribeButtonExample2" required/>
                                                      <div className="input-group-append">
                                                          <button className="btn btn-block btn-dark px-4" type="button" id="subscribeButtonExample2"><i className="fas fa-tags d-md-none"></i><span className="d-none d-md-inline">Применить купон</span></button>
                                                      </div>
                                                  </div>
                                              </form>
                                  
                                          </div>
                                          <div className="d-md-flex">
                                          <Link href="/">
                                              <button type="button" className="btn btn-soft-secondary mb-3 mb-md-0 font-weight-normal px-5 px-md-4 px-lg-5 w-100 w-md-auto">Продолжить покупку</button>
                                              </Link>
                                              <Link href="/checkout">
                                              <a className="btn btn-primary-dark-w ml-md-2 px-5 px-md-4 px-lg-5 w-100 w-md-auto d-none d-md-inline-block">Оформить заказ</a>
                                              </Link>
                                          </div>
                                      </div>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </form>
          </div>
          <div className="mb-8 cart-total">
              <div className="row">
                  <div className="col-xl-5 col-lg-6 offset-lg-6 offset-xl-7 col-md-8 offset-md-4">
                      <div className="border-bottom border-color-1 mb-3">
                          <h3 className="d-inline-block section-title mb-0 pb-2 font-size-26">Вся сумма</h3>
                      </div>
                      <table className="table mb-3 mb-md-0">
                          <tbody>
                              <tr className="order-total">
                                  <th>Всего</th>
                                  <td data-title="Total"><strong><span className="amount">{this.state.cart.total_with_discount} сум</span></strong></td>
                              </tr>
                          </tbody>
                      </table>
                      <Link href="/checkout">
                        <a>
                          <button type="button" className="btn btn-primary-dark-w ml-md-2 px-5 px-md-4 px-lg-5 w-100 w-md-auto d-md-none">Оформить заказ</button>
                        </a>
                      </Link>
                  </div>
              </div>
          </div>
      </div>
  </main>)}


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


export default connect(mapStateToProps, mapDispatchToProps)(Cart)