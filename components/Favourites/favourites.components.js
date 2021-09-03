import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";
import { css } from "@emotion/core";
import url from "../url";
import DeleteFavourite from "./delete.favourites.button";
import FavouriteButton from "../Buttons/favouriteButton";
import { connect } from "react-redux";
import { fetchCart } from "../../redux/actions/cart";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;



class Favourite extends React.Component {
  constructor() {
    super();

    this.state = {
      favourites: [],
      isLoading: true
    };
  }

  async componentDidMount() {
        this.Favourites()
        if (!this.props.cart.id) {
          this.props.fetchCart()
        }
  }

 Favourites = () => {
    axios
      .get(`${url}/api/user/favorites`)
      .then(response => {
   
        this.setState({ favourites: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {

    return (
      <main id="content" role="main" className="cart-page">
          <div className="container">
              <div className="my-6">
                  <h1 className="text-center">Избранные</h1>
              </div>
              <div className="mb-16 wishlist-table">
                  <form className="mb-4" action="#" method="post">
                      <div className="table-responsive">
                          <table className="table" cellspacing="0">
                              <thead>
                                  <tr>
                                      <th className="product-remove">&nbsp;</th>
                                      <th className="product-thumbnail">&nbsp;</th>
                                      <th className="product-name">Продукт</th>
                                      <th className="product-price">Цена</th>
                                      <th className="product-subtotal min-width-200-md-lg">&nbsp;</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {this.state.favourites ? this.state.favourites.map(favourite => (
                                  <tr>
                                      <td className="text-center">
                                      <DeleteFavourite onDelete={this.Favourites} favouriteID={favourite.id}/>
                                      </td>
                                      <td className="d-none d-md-table-cell">
                                          <a href="#"><img className="img-fluid max-width-100 p-1 border border-color-1" src={favourite.images[0].types.medium_default} alt={favourite.name}/></a>
                                      </td>
                                      <Link
                                        href={{
                                        pathname: "/product/[product]"
                                        }}
                                        as={`/product/${favourite.slug}`}
                                        >
                                      <td data-title="Product">
                                          <a href="#" className="text-gray-90">{favourite.name}</a>
                                      </td>
                                      </Link>
                                      <td data-title="Unit Price">
                                          <span className="">{favourite.random_shop.discount ? favourite.random_shop.discount.price.toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") : favourite.random_shop.price.toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</span>
                                      </td>
                                      <td>
                                      <FavouriteButton item_shop_id={favourite.random_shop.item_shop_id} cart={this.props.cart} product={favourite}/>
                                      </td>
                                  </tr>)): null}
                                 
                              </tbody>
                          </table>
                      </div>
                  </form>
              </div>
          </div>
      </main>
    )
   }
  }

  const mapStateToProps = (state) => {
    return {
      cart: state.cart
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchCart: () => dispatch(fetchCart())
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Favourite)