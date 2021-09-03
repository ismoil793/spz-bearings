import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import ButtonCart from "../ButtonCarts/CartButton";
import AddButtonFav from "../Favourites/Add_favourites_button";

const ProductLink = props => (
  <>
    <Link
      href={{
        pathname: "/productPage/[productCard]"
      }}
      as={`/productPage/${props.slug}`}
    >
      <div className="viewed_content text-center">
        <div className="viewed_price">{props.price} сум</div>
        <div className="viewed_name">
          <a>{props.name}</a>
        </div>
      </div>
    </Link>
  </>
);

const ImageLink = props => (
  <>
    <Link
      href={{
        pathname: "/productPage/[productCard]",
      
      }}
      as={`/productPage/${props.slug}`}
    >
      <div className="viewed_image">
        <img src={props.image} alt={props.id} />
      </div>
    </Link>
  </>
);

export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      relatedproduct: this.props.relatedProducts
    };
  }

  m
  render() {
    const { relatedproduct } = this.state;

    return (
      <>
        {relatedproduct ? (
          <div className="row">
            {typeof relatedproduct == "object"
              ? relatedproduct.map(request => (
                  <div className="col-md-3 owl-item">
                    <div className="viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
                      {/* <div className="viewed_image"><img src={request.images[0].types.large_default} alt=""/></div> */}
                      <ImageLink
                        image={
                          request.images[0]
                            ? request.images[0].types.large_default
                            : null
                        }
                        productID={request.random_shop.item_shop_id}
                        id={request.name}
                        slug={request.slug}
                      />
                      {/* <div className="viewed_content text-center">
                          <div className="viewed_price">{request.random_shop.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</div>
                          <div className="viewed_name"><a href="#">{request.name}</a></div>
                        </div> */}
                      <ProductLink
                      slug={request.slug}
                        productID={request.random_shop.item_shop_id}
                        id={request.name}
                        price={request.random_shop.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                      />

                      <AddButtonFav />
                      <ul className="item_marks">
                        <li className="item_mark item_discount">-25%</li>
                        <li className="item_mark item_new">new</li>
                      </ul>
                    </div>
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </>
    );
  }
}
