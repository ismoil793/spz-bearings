import React from "react";
import Link from "next/link";
import AddButtonFavs from "../Favourites/Add_favourites_button";
import axios from "axios";
// import shopButton from "./shop.button";
import CompareButton from "../Compare/CompareButton";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import url from "../url";
import Countdown from "react-countdown";


const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

// Random component
const Completionist = () => <span>Предложение закончилось</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div class="deals_timer_content ml-auto">
        <div class="deals_timer_box clearfix" data-target-time="">
          {days ? (
            <div class="deals_timer_unit">
              <div id="deals_timer1_days" class="deals_timer_days">
                {days}
              </div>
              <span> дней</span>
            </div>
          ) : null}
          <div class="deals_timer_unit">
            <div id="deals_timer1_hr" class="deals_timer_hr">
              {hours}
            </div>
            <span> часов</span>
          </div>
          <div class="deals_timer_unit">
            <div id="deals_timer1_min" class="deals_timer_min">
              {minutes}
            </div>
            <span> минут</span>
          </div>
          <div class="deals_timer_unit">
            <div id="deals_timer1_sec" class="deals_timer_sec">
              {seconds}
            </div>
            <span> сек</span>
          </div>
        </div>
      </div>
    );
  }
};

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
              <span>
                {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                сум
              </span>
              {props.discount_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              сум
            
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

        {props.until ? (
          <div class="deals_timer" id="deal_shop">
            <div class="deals_timer_title_container">
              <div class="deals_timer_title">Предложение заканчивается через:</div>
              <div class="deals_timer_subtitle"></div>
            </div>

            <Countdown
              date={Date.now() + props.until
                ? new Date(
                  props.until
                  ).getTime()
                : null}
              daysInHours={true}
              renderer={renderer}
            />
          </div>
        ) : null}
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

export default class GridProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      products: [],
      totalProducts: null,
      first: 0,
      last: 10,
      meta: {
        currentPage: null,
        lastPage: null,
        perPage: 12
      },
      isLoading: true,
      loading: true,
      cartNumber: props.cartNumber,
      sort_type: null,
      asc: null,
      sort_name: "",
      send_filters: true
    };
  }



  componentDidMount() {
    this.getProducts();
  }

  handlerCartNum = () => {
    this.props.grand();
  };

  handlerCompare = () => {
    this.props.compare();
  };

  // If user clicked other category, compare previos clicked category's id with current one and set send_filters state to false, in order to not send previous selected props to axios get method, beacuse I am getting them always via componentwillreceiveProps


  getProducts() {
  {
              axios
            .get(`${url}/api/products`, {
              params: {
                discount: this.props.discount,
                category_id: this.props.category_id,
                sort: this.state.sort_type,
                asc: this.state.asc,
                page: this.state.meta.currentPage,
                per_page: this.state.meta.perPage,
              }
            })
            .then(response => {
              this.setState({
                isLoading: false,
                products: response.data.data,
                totalProducts: response.data.meta.total,
                meta: {
                  currentPage: 1,
                  lastPage: response.data.meta.last_page,
                  perPage: response.data.meta.per_page
                },
                loading: false
              });
            })
            .catch(error => {
              console.log(error);
            })
      
    }
  }

  Pagination = e => {
    const meta = this.state.meta;
    meta.currentPage = e;

    this.setState({ meta: meta });

    this.getProducts();
  };

  createPaging = () => {
    let paging = [];

    for (let i = 1; i <= this.state.meta.lastPage; i++) {
      paging.push(
        <li key={i} onClick={() => this.Pagination(i)}>
          <a href="#">{i}</a>
        </li>
      );
    }
    return paging.slice(this.state.first, this.state.last);
  };

  IncrementPage = e => {
    e.preventDefault();
    const meta = this.state.meta;

    if (meta.currentPage < meta.lastPage) {
      meta.currentPage = meta.currentPage + 1;
      this.setState({
        meta: meta,
        first: this.state.first + 10,
        last: this.state.last + 10
      });
    } else {
      this.setState({ meta: meta });
    }

    this.getProducts();
  };

  DecrementPage = e => {
    const meta = this.state.meta;

    e.preventDefault();
    if (meta.currentPage > 1) {
      meta.currentPage = meta.currentPage - 1;
      this.setState({
        meta: meta,
        first: this.state.first - 10,
        last: this.state.last - 10
      });
    } else {
      this.setState({ meta: meta });
    }

    this.getProducts();
  };

  SortbyPriceMin = () => {
    setTimeout(() => {
      this.setState(
        {
          sort_type: "price",
          asc: 1,
          sort_name: "Цена по возрастанию"
        },
        () => {
          this.getProducts();
        }
      );
    }, 100);
  };

  SortbyPriceMax = () => {
    setTimeout(() => {
      this.setState(
        {
          sort_type: "price",
          asc: 0,
          sort_name: "Цена по убыванию"
        },
        () => {
          this.getProducts();
        }
      );
    }, 100);
  };

  render() {
    const { products, totalProducts, meta, isLoading } = this.state;

    return (
      <>
        <div className="shop_content">
          <div className="shop_bar clearfix">
            <div className="shop_product_count">
              <span>{totalProducts}</span> товаров найдено
            </div>
            <div className="shop_sorting">
              <span>Сортировать по:</span>
              <ul>
                <li>
                  <span className="sorting_text">
                    {this.state.sort_name}
                    <i className="fas fa-chevron-down"></i>
                  </span>
                  <ul>
                    <li
                      className="shop_sorting_button"
                      data-isotope-option='{ "sortBy": "price" }'
                      onClick={this.SortbyPriceMin}
                    >
                      Цена по возрастанию
                    </li>
                    <li
                      className="shop_sorting_button"
                      data-isotope-option='{ "sortBy": "price" }'
                      onClick={this.SortbyPriceMax}
                    >
                      Цена по убыванию
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={100}
              color={"red"}
              loading={this.state.loading}
            />
            {/* <div className="product_grid_border"></div> */}
            {products.length
              ? products.map(product => (
                  <div
                    key={product.id}
                    className="col-xs-6 col-sm-6 col-md-3 col-lg-3"
                  >
                    <div
                      className={
                        product.random_shop.discount &&
                        product.random_shop.discount.until
                          ? "product_item  deal_products"
                          : "product_item"
                      }
                    >
                      {/* <div className="product_border"></div> */}

                      <div className="product_image d-flex flex-column align-items-center justify-content-center">
                        <ImageLink
                          image={
                            product.images[0]
                              ? product.images[0].types.medium_default
                              : null
                          }
                          productID={product.id}
                          id={product.name}
                          slug={product.slug}
                        />
                      </div>

                      <ProductLink
                        productID={product.id}
                        price={product.random_shop.price}
                        discount_price={
                          product.random_shop.discount
                            ? product.random_shop.discount.price
                            : null
                        }
                        until={
                          product.random_shop.discount
                            ? product.random_shop.discount.until
                            : null
                        }
                        id={product.name}
                        slug={product.slug}
                        quantity={product.random_shop.quantity}
                      />

                      <shopButton
                        handler={this.handlerCartNum}
                        cartNumber={this.state.cartNumber}
                        productss_id={product.random_shop.item_shop_id}
                      />
                 

                      <AddButtonFavs favouriteID={product.id} />
                      <CompareButton
                        handleCompare={this.handlerCompare}
                        favouriteID={product.id}
                      />
                      <ul className="product_marks">
                        <li className="product_mark product_discount">-25%</li>
                        <li className="product_mark product_new">new</li>
                      </ul>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        {this.state.meta.lastPage == 1 ? null : (
          <div className="shop_page_nav d-flex flex-row">
            <div
              onClick={this.DecrementPage}
              className="page_prev d-flex flex-column align-items-center justify-content-center"
            >
              <i className="fas fa-chevron-left"></i>
            </div>
            <ul className="page_nav d-flex flex-row">{this.createPaging()}</ul>
            <div
              onClick={this.IncrementPage}
              className="page_next d-flex flex-column align-items-center justify-content-center"
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        )}
      </>
    );
  }
}
