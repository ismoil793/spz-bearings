import React from "react";
import Link from "next/link";
import AddButtonFavs from "../Favourites/Add_favourites_button";
import axios from "axios";
import catalogButton from "./catalog.button";

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import url from "../url";
import Countdown from "react-countdown";
import FavouriteButton from "../Favourites/Add_favourites_button";
import CompareButton from "../Compare/CompareButton";
import CartButton from "../Buttons/cartButton";

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
      <div className="deals_timer_content ml-auto">
        <div className="deals_timer_box clearfix" data-target-time="">
          {days ? (
            <div className="deals_timer_unit">
              <div id="deals_timer1_days" className="deals_timer_days">
                {days}
              </div>
              <span> дней</span>
            </div>
          ) : null}
          <div className="deals_timer_unit">
            <div id="deals_timer1_hr" className="deals_timer_hr">
              {hours}
            </div>
            <span> часов</span>
          </div>
          <div className="deals_timer_unit">
            <div id="deals_timer1_min" className="deals_timer_min">
              {minutes}
            </div>
            <span> минут</span>
          </div>
          <div className="deals_timer_unit">
            <div id="deals_timer1_sec" className="deals_timer_sec">
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

        {props.until ? (
          <div className="deals_timer" id="deal_shop">
            <div className="deals_timer_title_container">
              <div className="deals_timer_title">
                Предложение заканчивается через:
              </div>
              <div className="deals_timer_subtitle"></div>
            </div>

            <Countdown
              date={
                Date.now() + props.until
                  ? new Date(props.until).getTime()
                  : null
              }
              daysInHours={true}
              renderer={renderer}
            />
          </div>
        ) : null}
      </div>
    </Link>
  </>
);

export default class Product extends React.Component {
 

  constructor(props) {
    super(props);
    this.state = {
      params: props.option,
      category_id: props.category_id,
      products: [],
      totalProducts: null,
      first: 0,
      last: 10,
      selectedFeatures: [],
      meta: {
        currentPage: null,
        lastPage: null,
        perPage: 12
      },
      isLoading: true,
      cartNumber: props.cartNumber,
      sort_type: null,
      sort_value: null,
      sort_name: "",
      send_filters: true,
    };
  }

  // If user clicked other category, compare previos clicked category's id with current one and set send_filters state to false, in order to not send previous selected props to axios get method, beacuse I am getting them always via componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.brandID !== this.props.brandID) {
      this.getProducts();
    }
    if (prevProps.category_id !== this.props.category_id) {
      this.setState(
        {
          params: {
            value: {
              min: "",
              max: ""
            }
          },
          isLoading: true,
          selectedBrands: "",
          selectedFeatures: [],
          send_filters: false
        },
        () => {
          this.getProducts();
        }
      );
    }

    if (prevProps.option !== this.props.option) {
      let feature_value_ids = [];
      if(this.props.option.features){
        for (let i = 0; i < this.props.option.features.length; i++) {
          feature_value_ids = feature_value_ids.concat(
            this.props.option.features[i].selectedValues
          );
        }
        this.setState(
          {  isLoading: true,
            selectedFeatures: feature_value_ids,
            params: this.props.option
          },
          () => {
            this.getProducts();
          }
        );
      }
    
    }
  }

  componentDidMount = () =>{
   this.getProducts()
  }

  getProducts() {
  if(this.props.category_id !==null ){
    axios
    .get(`${url}/api/products`, {
      params: {
        brand_id: this.props.brandID ? this.props.brandID : null,
        category_id: this.props.category_id ? this.props.category_id : null,
        feature_value_ids: this.state.selectedFeatures
          ? this.state.selectedFeatures
          : null,
        brand_ids: this.state.params.selectedBrands
          ? this.state.params.selectedBrands
          : null,
        sort: this.state.sort_type,
        asc: this.state.sort_value,
        page: this.state.meta.currentPage,
        per_page: this.state.meta.perPage,
        min_price: this.state.params.value.min,
        max_price: this.state.params.value.max
      }
    })
    .then(response => {
      this.setState({
        products: response.data.data,
        totalProducts: response.data.meta.total,
        meta: {
          currentPage: response.data.meta.current_page,
          lastPage: response.data.meta.last_page,
          perPage: response.data.meta.per_page
        },
        isLoading: false
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

      
      if(this.state.meta.currentPage === i){
        paging.push(
          <li className="page-item" key={i} onClick={() => this.Pagination(i)}>
          <a className="page-link current">{i}</a>
        </li>
        )
      }else{
        paging.push(
          <li className="page-item" key={i} onClick={() => this.Pagination(i)}>
          <a className="page-link">{i}</a>
        </li>
        )
      }
    ;
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

  Sort = (e) =>{
    this.setState({
      sort_type: "price",
      sort_value: e.target.value
    },() => {
        this.getProducts()
    })
    
  }
  render() {
    return (
      <>
      <div className="col-xl-9 col-wd-9gdot5">
        <div className="flex-center-between mb-3">
          <h3 className="font-size-25 mb-0">{this.props.category_name}</h3>
          <p className="font-size-14 text-gray-90 mb-0">
           Найдено: {this.state.totalProducts} товаров
          </p>
        </div>

        <div className="bg-gray-1 flex-center-between borders-radius-9 py-1">
          <div className="d-xl-none">
            <a
              id="sidebarNavToggler1"
              className="btn btn-sm py-1 font-weight-normal"
              href="javascript:;"
              role="button"
              aria-controls="sidebarContent1"
              aria-haspopup="true"
              aria-expanded="false"
              data-unfold-event="click"
              data-unfold-hide-on-scroll="false"
              data-unfold-target="#sidebarContent1"
              data-unfold-type="css-animation"
              data-unfold-animation-in="fadeInLeft"
              data-unfold-animation-out="fadeOutLeft"
              data-unfold-duration="500"
            >
              <i className="fas fa-sliders-h"></i>{" "}
              <span className="ml-1">Фильтры</span>
            </a>
          </div>
          <div className="px-3 d-none d-xl-block">
            <ul className="nav nav-tab-shop" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="pills-one-example1-tab"
                  data-toggle="pill"
                  role="tab"
                  aria-controls="pills-one-example1"
                  aria-selected="false"
                >
                  <div className="d-md-flex justify-content-md-center align-items-md-center">
                    <i className="fa fa-th"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="d-flex">
            <form method="get">
              <select
                onChange={this.Sort}
                value={this.state.sort_value}
                className="js-select selectpicker dropdown-select pointer max-width-200 max-width-160-sm right-dropdown-0 px-2 px-xl-0 btn-sm bg-white font-weight-normal py-2 border text-gray-20 bg-lg-down-transparent border-lg-down-0"
               
              >
                <option value="" selected>
                  Сортировать по ...
                </option>
                <option value="1">по наименьшей цене</option>
                <option value="0">по наивысшей цене</option>
              </select>
            </form>
          </div>
          <nav className="px-3 flex-horizontal-center text-gray-20 d-none d-xl-flex">
            <form method="post" className="min-width-50 mr-1">
              <input
                size="2"
                readOnly
                type="number"
                className="form-control text-center px-2 height-35"
                value={this.state.meta.currentPage}
              />
            </form>{" "}
            из {this.state.meta.lastPage}
            <a className="text-gray-30 font-size-20 ml-2" href="#">
              
            </a>
          </nav>
        </div>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade pt-2 show active"
            id="pills-one-example1"
            role="tabpanel"
            aria-labelledby="pills-one-example1-tab"
            data-target-group="groups"
          >
            <ul className="row list-unstyled products-group no-gutters">
              {this.state.products
                ? this.state.products.map(product => (
                    <li className="col-6 col-md-4 col-wd-2gdot4 product-item">
                      <div className="product-item__outer h-100">
                        <div className="product-item__inner px-xl-4 p-3">
                          <div className="product-item__body pb-xl-2">
                            <div className="mb-2">
                              <a
                                
                                className="font-size-12 text-gray-5"
                              >
                                {product.country ? product.country.name : null}
                              </a>
                            </div>
                            <Link
                        href={{
                          pathname: "/product/[product]"
                        }}
                        as={`/product/${product.slug}`}
                        >
                            <h5 className="mb-1 product-item__title">
                              <a
                               
                                className="text-blue font-weight-bold"
                              >
                                {product.name}
                              </a>
                            </h5>
                            </Link>
                            <Link
                        href={{
                          pathname: "/product/[product]"
                        }}
                        as={`/product/${product.slug}`}
                        >
                            <div className="mb-2">
                              <a
                               
                                className="d-block text-center"
                              >
                                <img
                                  className="img-fluid"
                                  src={product.images[0] ? product.images[0].types.medium_default : null}
                                  alt={product.name}
                                />
                              </a>
                            </div>
                            </Link>
                            <div className="flex-center-between mb-1">
                              {product.random_shop.discount ? (
                                <div className="prodcut-price d-flex align-items-center flex-wrap position-relative">
                                  <ins className="font-size-20 text-red text-decoration-none mr-2">
                                    {product.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </ins>
                                  <del className="font-size-12 tex-gray-6 position-absolute bottom-100">
                                    {" "}
                                    {product.random_shop.discount
                                      ? product.random_shop.discount.price
                                          .toString()
                                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                                      : null}{" "}
                                    сум
                                  </del>
                                  <div className="no-nds">
                                  Без учета НДС
                                 </div>
                                </div>
                              ) : (
                                <div className="prodcut-price">
                                  <div className="text-gray-100">
                                    {product.random_shop.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        " "
                                      )}{" "}
                                    сум
                                  </div>
                                  <div className="no-nds">
                                  Без учета НДС
                                 </div>
                                </div>
                              )}
                              <div className="d-none d-xl-block prodcut-add-cart">
                                <CartButton 
                                item_shop_id={product.random_shop.item_shop_id}
                                product_name={product.name}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="product-item__footer">
                            <div className="border-top pt-2 flex-center-between flex-wrap">
                              <CompareButton product_name={product.name} product_id={product.id}/>
                              <FavouriteButton product_name={product.name} product_id={product.id}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        <nav
          className="d-md-flex justify-content-between align-items-center border-top pt-3"
          aria-label="Page navigation example"
        >
          <div className="text-center text-md-left mb-3 mb-md-0">
            Покупайте выгодно с Kitmach Premium
          </div>
          <ul className="pagination mb-0 pagination-shop justify-content-center justify-content-md-start">
            {/*{this.createPaging()}*/}
          </ul>
        </nav>
      </div>
      
      </>
    );
  }
}
