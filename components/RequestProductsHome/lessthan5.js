import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import "../../plugins/axios";
import ButtonProductCartHome from "../ButtonCarts/CartButton";
import FavouriteButton from "../Favourites/Add_favourites_button";
import CompareButton from "../Compare/CompareButton";
import CartButton from "../Buttons/cartButton";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import url from "../url";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

const ProductLink = props => (
  <>
    <Link
      href={{
        pathname: "/productPage/[productCard]"
      }}
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
      href={{
        pathname: "/productPage/[productCard]"
      }}
      as={`/productPage/${props.slug}`}
    >
      <img className="images" src={props.image} alt={props.slug} />
    </Link>
  </>
);
export default class Less5products extends React.Component {
  handleParent = () => {
    this.props.change();
  };
  handleCompare = () => {
    this.props.compare();
  };

  render() {
    return (
      <>
       {this.props.less5products ? (
        <ul className="row list-unstyled products-group no-gutters mb-0 overflow-visible">
            {typeof this.props.less5products.product_request == "object"
              ? this.props.less5products.product_request.slice(0,6).map(request => (
               
                <li key={request.id} className="col-wd-3 col-md-4 product-item product-item__card pb-2 mb-2 pb-md-0 mb-md-0 border-bottom border-md-bottom-0">
                    <div className="product-item__outer h-100">
                    <div className="product-item__inner p-md-3 row no-gutters">
                        <Link
                        href={{
                          pathname: "/product/[product]"
                        }}
                        as={`/product/${request.slug}`}
                        >
                            <div className="col col-lg-auto pointer product-media-left">
                                <a className="max-width-150 d-block"><img className="img-fluid" src={request.images[0].types.small_default}  alt="Image Description"/></a>
                            </div>
                            </Link>
                            <div className="col product-item__body pl-2 pl-lg-3 mr-xl-2 mr-wd-1">
                            <Link
                              href={{
                                pathname: "/product/[product]"
                              }}
                              as={`/product/${request.slug}`}
                              >
                                <div className="mb-4">
                                    <div className="mb-2"><a className="font-size-12 text-gray-5">{request.country ?  request.country.name : ''}</a></div>
                                    <h5 className="pointer product-item__title"><a  className="text-blue font-weight-bold">{request.name}</a></h5>
                                </div>
                                </Link>
                                <div className="flex-center-between mb-3">
                                    <div className="prodcut-price">
                                        <div className="text-gray-100">{request.random_shop.price.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</div>
                      <div className="no-nds">
                                  Без учета НДС
                                 </div>
                                    </div>
                                    
                              <CartButton item_shop_id={request.random_shop.item_shop_id} product_name={request.name}/>
                                </div>
                                <div className="product-item__footer">
                                    <div className="border-top pt-2 flex-center-between flex-wrap">
                                    <CompareButton product_name={request.name} product_id={request.id} />
                                    <FavouriteButton product_name={request.name} product_id={request.id} /> 
                                    </div>
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
