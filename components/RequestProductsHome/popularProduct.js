import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import ButtonProductCartHome from "../ButtonCarts/CartButton";
import "../../plugins/axios";
import FavouriteButton from "../Favourites/Add_favourites_button";
import CompareButton from "../Compare/CompareButton";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import url from "../url";
import CartButton from "../Buttons/cartButton";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

const ProductLink = props => (
  <>
    <Link
      href={{ pathname: "/productPage/[productCard]" }}
      as={`/productPage/${props.slug}`}
    >
      <div className="product_content">
        {props.quantity ? (
          props.discount_price ? (
            <div className="product_price">
              {props.discount_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              сум
              <span>
                {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                сум
              </span>
            </div>
          ) : (
            <div className="product_price">
              {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум
            </div>
          )
        ) : (
          <div className="product_price">Нет в наличии</div>
        )}

        <div className="viewed_name">
          <a className="name">{props.id}</a>
        </div>
      </div>
    </Link>
  </>
);

const ImageLink = props => (
  <>
    <Link
      href={{ pathname: "/productPage/[productCard]" }}
      as={`/productPage/${props.slug}`}
    >
      <img className="images" src={props.image} alt={props.slug} />
    </Link>
  </>
);

export default class PopularProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popularproduct: this.props.data,
      loading: true
    };
  }

  handleParent = () => {
    this.props.change();
  };

  handleCompare = () => {
    this.props.compare();
  };

  render() {
    const { popularproduct } = this.state;



    return (
      <>
        {this.props.popularproducts ? (
          <ul className="row list-unstyled products-group no-gutters">
            {typeof this.props.popularproducts.product_request == "object"
              ? this.props.popularproducts.product_request.map(request => (
                <li className="col-6 col-wd-3 col-md-4 product-item" key={request.id}>
                <div className="product-item__outer h-100">
                    <div className="product-item__inner px-xl-4 p-3">
                   
                        <div className="product-item__body pb-xl-2">
                      
                    
                            <div className="mb-2"><a href="#" className="font-size-12 text-gray-5">{request.country ?  request.country.name : ''}</a></div>
                            <Link
                              href={{
                                pathname: "/product/[product]"
                              }}
                              as={`/product/${request.slug}`}   
                        >
                            <h5 className="mb-1 product-item__title"><a href="#" className="text-blue font-weight-bold">{request.name}</a></h5></Link>
                            <Link
                        href={{
                          pathname: "/product/[product]"
                        }}
                        as={`/product/${request.slug}`}
                        >
                            <div className="mb-2">
                                <a href="#" className="d-block text-center"><img className="img-fluid" src={request.images[0].types.medium_default} alt="Image Description"/></a>
                            </div>
                            </Link>
                         
                            
                            <div className="flex-center-between mb-1">
                            {request.random_shop.discount ? (
                               <div class="prodcut-price d-flex align-items-center flex-wrap position-relative">
                               <ins class="font-size-20 text-red text-decoration-none mr-2">{request.random_shop.price.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</ins>
                               <del class="font-size-12 tex-gray-6 position-absolute bottom-100"> {request.random_shop
                      .discount
                      ? request.random_shop.discount.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      : null} сум</del>
                        <div className="no-nds">
                                  Без учета НДС
                                 </div>
                            </div>
                            ) : (
                                  <div className="prodcut-price">
                                  <div className="text-gray-100">{request.random_shop.price.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</div>
                              <div className="no-nds">
                                  Без учета НДС
                                 </div>
                              </div>
                            )}
                            
                              <CartButton item_shop_id={request.random_shop.item_shop_id} product_name={request.name}/>
                            </div>
                        </div>
                 
                      
                        <div className="product-item__footer">
                            <div className="border-top pt-2 flex-center-between flex-wrap">
                              <CompareButton product_name={request.name} product_id={request.id} />
                              <FavouriteButton product_name={request.name} product_id={request.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </li>   
                ))
              : null}
          </ul>
        ) : null}
      </>
    );
  }
}
