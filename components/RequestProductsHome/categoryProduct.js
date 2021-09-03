
import React from "react";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";

import FavouriteButton from "../Favourites/Add_favourites_button";
import CompareButton from "../Compare/CompareButton";
import ButtonProductCartHome from "../ButtonCarts/CartButton";

import Cookies from "universal-cookie";
import CartButton from "../Buttons/cartButton";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import url from "../url";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;


export default class CategoryProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      discountproduct: [],
      loading: true
    };
  }

  handleParent = () => {
    this.props.change();
  };
  handleCompare = () => {
    this.props.compare();
  };

  async componentDidMount() {
    setTimeout(() => {
      // this.requestProduct();
    }, 10);
  }

  render() {
    return (
        <>
 <div
className="mb-6"
style={{
  backgroundImage:
    "url(" + "../../static/assets/img/1920X1080/img4.jpg" + ")"
}}
>
<div className="container">
  <div className="row min-height-564 align-items-center">
    <div className="col-12 col-lg-4 col-xl-5 col-wd-6 d-none d-md-block">
      <img
        className="img-fluid"
        src="/static/assets/img/product_banner.png"
        alt="Image Description"
      />
    </div>
    <div className="col-12 col-lg-8 col-xl-7 col-wd-6 pt-6 pt-md-0">
      <div className=" d-flex border-bottom border-color-1 mr-md-2">
        <h3 className="section-title section-title__full mb-0 pb-2 font-size-22">
         Тепловые оборудования
        </h3>
      </div>
      <div
        className="js-slick-carousel position-static  u-slick--gutters-2  overflow-hidden u-slick-overflow-visble py-5"
        data-arrows-classes="position-absolute top-0 font-size-17 u-slick__arrow-normal top-10 pt-6 pt-md-0"
        data-arrow-left-classes="fa fa-angle-left right-2"
        data-arrow-right-classes="fa fa-angle-right right-1"
        data-pagi-classes="text-center right-0 bottom-1 left-0 u-slick__pagination u-slick__pagination--long mb-0 z-index-n1 mt-4"
      >
        <div className="js-slide">
        {this.props.categoryproducts ? (
          <ul className="row list-unstyled products-group no-gutters mb-0 overflow-visible">
            
          {typeof this.props.categoryproducts.product_request == "object"
              ? this.props.categoryproducts.product_request.slice(0,4).map(request => (
            <li className="col-md-6 product-item product-item__card mb-2 remove-divider pr-md-2 border-bottom-0" key={request.id}>
            
              <div className="product-item__outer h-100 w-100">
                <div className="product-item__inner p-md-3 row no-gutters bg-white max-width-334">
                  <div className="col col-lg-auto product-media-left">
                  <Link
                        href={{
                          pathname: "/product/[product]"
                        }}
                        as={`/product/${request.slug}`}
                        >
                    <a
                    
                      className="max-width-120 d-block"
                    >
                      <img
                        className="img-fluid"
                        src={request.images[0].types.medium_default} alt={request.name}
                      />
                    </a>
                    </Link>
                  </div>
                  <div className="col product-item__body pl-2 pl-lg-3 mr-xl-2 mr-wd-1 pr-3 pr-md-0 pt-1 pt-md-0">
                    <div className="mb-2">
                      <div className="mb-2">
                      
                        <a
                          className="font-size-12 text-gray-5"
                        >
                         {request.country ?  request.country.name : ''}
                        </a>
                      </div>
                      <h5 className="product-item__title">
                      <Link
                        href={{
                          pathname: "/product/[product]"
                        }}
                        as={`/product/${request.slug}`}
                        >
                        <a
                          className="text-blue font-weight-bold"
                        >
                        {request.name}
                        </a>
                        </Link>
                      </h5>
                     
                    </div>
                    <div className="flex-center-between mb-2">
                      <div className="prodcut-price">
                        <div className="text-gray-100">
                        {request.random_shop
                      .discount
                      ? request.random_shop.discount.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      : request.random_shop.price.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум
                        </div>
                        <div className="no-nds">
                                  Без учета НДС
                                 </div>
                      </div>
                      <div className="d-none d-xl-block prodcut-add-cart">
                      <CartButton item_shop_id={request.random_shop.item_shop_id} product_name={request.name}/>
                    </div>
                    {/* <div className="product-item__footer bg-white">
                      <div className="border-top pt-2 flex-center-between flex-wrap">
                      <CompareButton product_name={request.name} product_id={request.id} />
                     <FavouriteButton product_name={request.name} product_id={request.id} />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              </div>
            </li>)) : null}
          </ul>) : null}
        </div>
     </div>
    </div>
  </div>
</div>
</div>
   </>
    );
  }
}
