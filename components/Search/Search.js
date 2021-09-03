import React from "react";

import Link from "next/link";
import axios from "axios";

import { css } from "@emotion/core";
import url from "../url";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

export default class SearchList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false,
      products: []
    };
  }

  componentDidMount() {
    this.Search();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searching !== this.props.searching) {
      this.Search();
    }
  }

  Search = () => {
    axios
      .get(`${url}/api/search`, {
        params: {
          search: this.props.searching
        }
      })
      .then(response => {
        console.log(response)
        this.setState({
          products: response.data.products
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="cart_section">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="cart_container">
                  <div className="cart_title">
                   Найдено  <span className="title_pin">{this.state.products.length}</span> товаров по запросу: <span className="title_pin"> {this.props.searching}</span>
                  </div>

                  <div className="cart_items">
                    <ul className="cart_list">
                      {this.state.products
                        ? this.state.products.map((product, i) => (
                            <li key={i} className="cart_item clearfix col-sm-12 col-md-6 col-xl-4">
                              <Link
                                href={{
                                  pathname: "/product/[productCard]",
                                }}
                                as={`/product/${product.slug}`}
                              >
                                <div className="search_item_image">
                                  <img src={product.image} alt={product.name} />
                                </div>
                              </Link>

                              <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                <div className="search_item_name cart_info_col">
                                <Link
                                    href={{
                                        pathname: "/product/[productCard]",
                                    }}
                                    as={`/product/${product.slug}`}
                                    >
                                    <div className="search_item_text_name">
                                      {product.name}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </li>
                          ))
                        : null}
                    </ul>
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
