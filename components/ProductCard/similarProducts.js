import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import ButtonCart from "../ButtonCarts/CartButton";
import AddButtonFav from "../Favourites/Add_favourites_button";
import url from "../url";

const ProductLink = props => (
  <>
    <Link
      href={{
        pathname:"/productPage/[productCard]",
      }}
      as={`/productPage/${props.slug}`}
    >
      <div className="viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
        <div className="viewed_image">
          <img src={props.image} alt={props.id} />
        </div>
        <div className="viewed_content text-center">
          <div className="viewed_price">
            {props.price}
            сум
          </div>
          <div className="viewed_name">
            <a href="#">{props.id}</a>
          </div>
        </div>

        {/* <ul className="item_marks">
          <li className="item_mark item_discount">-25%</li>
          <li className="item_mark item_new">new</li>
        </ul> */}
      </div>
    </Link>
  </>
);

export default class SimilarProd extends React.Component {
  constructor() {
    super();

    this.state = {
      weekproduct: []
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.requestProduct();
    }, 0);
  }

  async requestProduct() {
    await axios
      .get(`${url}/api/products/similar`, {
        params: {
          product_id: this.props.prod_id,
          per_page: 4
        }
      })
      .then(response => {
        this.setState({ weekproduct: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const { weekproduct } = this.state;

    return (
      <>
        {weekproduct ? (
          <div className="row">
            {typeof weekproduct == "object"
              ? weekproduct.map((request,i) => (
                  <div key={i} className="col-md-3 owl-item">
                    <ProductLink
                   
                      slug={request.slug}
                      price={request.random_shop.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                      image={request.images[0] ? request.images[0].types.home_default : null}
                      
                      id={request.name}
                    />
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </>
    );
  }
}
