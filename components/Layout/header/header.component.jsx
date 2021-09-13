import React from "react";
import Category from "../../Categories/categories";
import axios from "axios";
import "../../../plugins/axios";
import Link from "next/link";
import Search from "../../Search/search.component";
import Router from "next/router";
const uuidv1 = require("uuid/v1");

import Cookies from "universal-cookie";

import url from "../../url";
import { connect } from "react-redux";
import { fetchSetUserInfo } from "../../../redux/actions/userInfo";
import { fetchCompare } from "../../../redux/actions/compare";
import { fetchFavorites } from "../../../redux/actions/favorites";
import { Nav } from "reactstrap";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      mobile_menu: false,
      searching: "",
      products: [],
      search_id: "",
      isRegister: false,
      isLogin: false,
      isAside: false,
      isPopupCart: false,
      isCategories: false,
      isMobileSearch: false,
      userInfo: {},
      search_is_open: false,
      menu_is_opened: false,
    };
  }

  Callback = () => {
    this.setState((prevState) => ({
      mobile_menu: !prevState.mobile_menu,
    }));
  };

  HideRegister = (data) => {
    this.setState({
      isRegister: data,
    });
  };

  HideAside = (data) => {
    this.setState({
      isAside: data,
    });
  };

  HideCategories = (data) => {
    this.setState({
      isCategories: data,
    });
  };

  HideLogin = (data) => {
    this.setState({
      isLogin: data,
    });
  };

  HidePopUp = (data) => {
    this.setState({
      isPopupCart: data,
    });
  };

  Search = () => {
    axios
      .get(`${url}/api/search`, {
        params: {
          search: this.state.searching,
        },
      })
      .then((response) => {
        //   this.setState({ searched: response.data.products });
        let products = [];
        if (response.data.products.length) {
          for (let i = 0; i < response.data.products.length; i++) {
            products.push({
              value: response.data.products[i].id,
              text: response.data.products[i].name,
            });
          }
        }
        setTimeout(() => {
          this.setState({ products: products });
        }, 100);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (e) => {
    {
      e.target.value
        ? Router.push({
            pathname: `/productPage/${e.target.text}`,
            query: { product_id: e.target.value },
          })
        : null;
    }
  };

  Register = (e) => {
    this.setState((prevState) => ({
      isRegister: !prevState.isRegister,
    }));
  };

  handleMobileSearch = (e) => {
    this.setState((prevState) => ({
      isMobileSearch: !prevState.isMobileSearch,
    }));
  };

  Login = (e) => {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  AsideCategory = (e) => {
    this.setState((prevState) => ({
      isAside: !prevState.isAside,
    }));
  };

  PopupCart = (e) => {
    this.setState((prevState) => ({
      isPopupCart: !prevState.isPopupCart,
    }));
  };

  Categories = (e) => {
    this.setState((prevState) => ({
      isCategories: !prevState.isCategories,
    }));
  };

  componentDidMount() {
    const cookies = new Cookies();
    const current = new Date();
    const nextYear = new Date();
    if (!this.props.compare) {
      this.props.getCompare();
    }

    if (!this.props.user.user.id) {
      this.props.getFavourites();
    }

    nextYear.setFullYear(current.getFullYear() + 1);

    if (!cookies.get("device_token") || !cookies.get("device_type")) {
      let device_id = uuidv1();
      cookies.set("device_token", device_id, {
        path: "/",
        expires: nextYear,
      });
      cookies.set("device_type", "web");
    }
    axios({
      method: "post",
      url: `${url}/api/device/create`,
      data: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        user_id: cookies.get("user_id"),
      },
    })
      .then((response) => {})
      .catch((error) => {});
    if (Object.keys(this.props.user.user).length === 0) {
      axios
        .get(`${url}/api/user/info`)
        .then((response) => {
          this.props.setUserInfo(response.data.data);
          // this.setState({ userInfo: response.data.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.menu_is_opened !== this.state.menu_is_opened) {
      document.body.className = this.state.menu_is_opened
        ? "menu-is-opened"
        : "menu-is-closed";
    }
  }

  render() {
    const cookies = new Cookies();
    let { url } = this.state;

    if (cookies.get("access_token")) {
      url = "/user";
    } else {
      url = "/login";
    }

    return (
      <>
        <header id="header" className="u-header u-header-left-aligned-nav">
          <div
            className={`header_big_logo ${
              this.props.isLoading ? "" : "header_fixed"
            }`}
          >
            {this.props.isHome ? (
              <div className="header_top">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="list-unstyled menu_contact_info">
                        <li>
                          <a href="mailto:gpz-uz@mail.ru">
                            {" "}
                            <i className="far fa-envelope-open"></i>
                            gpz-uz@mail.ru
                          </a>{" "}
                        </li>
                        <li>
                          <a href="tell:451951127851">
                            <i className="fas fa-phone"></i>+(99874) 755-23-59,
                            755-18-57
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="far fa-clock"></i>7/7: 9:00 - 18:00
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <Nav className="navbar navbar-expand-lg" id="header">
              <div className="container main_logo_container">
                {" "}
                <Link href="/">
                  <a
                    className={`navbar-brand big_logo ${
                      this.props.isHome ? "" : "mt-0"
                    }`}
                  >
                    <img
                      src="/static/assets/img/img/home-14/logo.png"
                      alt="logo"
                    />
                  </a>
                </Link>{" "}
                <Link href="/">
                  <a className="navbar-brand">
                    <img
                      src="/static/assets/img/img/home-one/logo.png"
                      alt="logo"
                    />
                  </a>
                </Link>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav menu">
                    <li className="nav-item">
                      {" "}
                      <Link href="/">
                        <a className="nav-link">Главная</a>
                      </Link>{" "}
                    </li>
                    <li className="nav-item dropdown submenu">
                      {" "}
                      <Link href="/about">
                        <a className="nav-link"> О Нас </a>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="nav-item active">
                          {" "}
                          <Link href="/about">
                            <a className="nav-link">История Завода</a>
                          </Link>
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link href="/team">
                            <a className="nav-link">Наша Команда</a>
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link
                            href={{
                              pathname: "/services/[singlenservice]",
                            }}
                            as={`/services/1`}
                          >
                            <a className="nav-link">Технический Центр</a>
                          </Link>{" "}
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown submenu">
                      {" "}
                      <Link href="/services">
                        <a className="nav-link"> Сервисы </a>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          {" "}
                          <Link href="/services">
                            <a className="nav-link">Сервисы</a>
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link
                            Link
                            href={{
                              pathname: "/services/[singlenservice]",
                            }}
                            as={`/services/1`}
                          >
                            <a className="nav-link">Детально Сервисы</a>
                          </Link>{" "}
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown submenu">
                      {" "}
                      <Link href="/news">
                        <a className="nav-link"> Новости </a>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          {" "}
                          <Link href="/news">
                            <a className="nav-link">Новости</a>
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link
                            href={{
                              pathname: "/news/[singlenews]",
                            }}
                            as={`/news/1`}
                          >
                            <a className="nav-link">Детально Новости</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown submenu">
                      {" "}
                      <Link href="/shop">
                        <a className="nav-link"> Продукция </a>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          {" "}
                          <Link href="/shop">
                            <a className="nav-link">Продукция</a>
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link
                            href={{
                              pathname: "/product/[product]",
                            }}
                            as={`/product/1`}
                          >
                            <a className="nav-link">Детально продукция</a>
                          </Link>{" "}
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link href="/contacts">
                        <a className="nav-link">Контакты</a>
                      </Link>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="list-unstyled navbar-nav navright cart_navbar wrapper_list_dropdown">
                <li className="shoping-cart">
                  {" "}
                  <Link href="/cart">
                    <a>
                      <i className="fas fa-cart-arrow-down"></i>
                    </a>
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="cart-single-item clearfix">
                      <div className="cart-img">
                        {" "}
                        <img
                          src="/static/assets/img/img/cart1.jpg"
                          alt="styler"
                        />{" "}
                      </div>
                      <div className="cart-content text-left">
                        <p className="cart-title">
                          <Link href="/product-details">
                            <a>Lorem, ipsum dolor.</a>
                          </Link>
                        </p>
                        <p>
                          <del>$10.00</del> - $8.50
                        </p>
                      </div>
                      <div className="cart-remove">
                        {" "}
                        <a href="#" className="action">
                          X
                        </a>{" "}
                      </div>
                    </li>
                    <li className="cart-single-item clearfix">
                      <div className="cart-img">
                        {" "}
                        <img
                          src="/static/assets/img/img/cart2.jpg"
                          alt="styler"
                        />{" "}
                      </div>
                      <div className="cart-content text-left">
                        <p className="cart-title">
                          <Link href="/product-details">
                            <a>Lorem, ipsum dolor.</a>
                          </Link>
                        </p>
                        <p>$12.00</p>
                      </div>
                      <div className="cart-remove">
                        {" "}
                        <a href="#" className="action">
                          X
                        </a>{" "}
                      </div>
                    </li>
                    <li className="cart_f">
                      <div className="cart-pricing">
                        <p className="total">
                          Subtotal :
                          <span className="p-total text-right">$20.50</span>
                        </p>
                      </div>
                      <div className="cart-button">
                        {" "}
                        <button className="theme_btn hover_style1">
                          Посмотреть в корзину
                        </button>
                        <button className="theme_btn theme_btn_three hover_style1">
                          Оформить заказ
                        </button>{" "}
                      </div>
                    </li>
                  </ul>
                </li>
                <li
                  onClick={() =>
                    this.setState({
                      search_is_open: !this.state.search_is_open,
                    })
                  }
                  className={`search ${
                    this.state.search_is_open ? "open" : ""
                  }`}
                >
                  {" "}
                  <a href="javascript:void(0);">
                    <i class="fas fa-search"></i>
                  </a>
                  <form action="#" method="get" className="search-form">
                    <div className="input-group">
                      {" "}
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Searching for..."
                      />{" "}
                      <button type="submit">
                        <i className="fas fa-search"></i>
                      </button>{" "}
                    </div>
                  </form>
                </li>
                <li
                  onClick={() =>
                    this.setState({
                      menu_is_opened: !this.state.menu_is_opened,
                    })
                  }
                >
                  {" "}
                  <a href="#" className="menu_btn">
                    <i class="fas fa-align-justify"></i>
                  </a>{" "}
                </li>
              </ul>
            </Nav>
          </div>
        </header>
        {/* {this.state.isLogin || this.state.isRegister ? (
        <aside id="sidebarContent" className="u-sidebar u-sidebar__lg" aria-labelledby="sidebarNavToggler">
            <div className="u-sidebar__scroller">
                <div className="u-sidebar__container">
                    <div className="js-scrollbar u-header-sidebar__footer-offset pb-3">
            
                        <div className="d-flex align-items-center pt-4 px-7">
                            <button type="button" className="close ml-auto"
                                aria-controls="sidebarContent"
                                aria-haspopup="true"
                                aria-expanded="false"
                                data-unfold-event="click"
                                data-unfold-hide-on-scroll="false"
                                data-unfold-target="#sidebarContent"
                                data-unfold-type="css-animation"
                                data-unfold-animation-in="fadeInRight"
                                data-unfold-animation-out="fadeOutRight"
                                data-unfold-duration="500">
                                <i className="ec ec-close-remove"></i>
                            </button>
                        </div>
                       
                        <div className="js-scrollbar u-sidebar__body">
                            <div className="u-sidebar__content u-header-sidebar__content">
                                <form className="js-validate">
                                
                                {this.state.isRegister ? <Register hide={this.HideRegister} /> : null}
                                {this.state.isLogin ? <Login hide={this.HideLogin}/> : null} 
                                    {/* <div id="forgotPassword" style={{display: 'none', opacity: '0'}} data-target-group="idForm">
                                 
                                        <header className="text-center mb-7">
                                            <h2 className="h4 mb-0">Восстановить пароль.</h2>
                                            <p>Enter your email address and an email with instructions will be sent to you.</p>
                                        </header>
                                       

                                        
                                        <div className="form-group">
                                            <div className="js-form-message js-focus-state">
                                                <label className="sr-only" for="recoverEmail">Your email</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="recoverEmailLabel">
                                                            <span className="fas fa-user"></span>
                                                        </span>
                                                    </div>
                                                    <input type="email" className="form-control" name="email" id="recoverEmail" placeholder="Your email" aria-label="Your email" aria-describedby="recoverEmailLabel" required
                                                    data-msg="Please enter a valid email address."
                                                    data-error-className="u-has-error"
                                                    data-success-className="u-has-success"/>
                                                </div>
                                            </div>
                                        </div>
                                      

                                        <div className="mb-2">
                                            <button type="submit" className="btn btn-block btn-sm btn-primary transition-3d-hover">Recover Password</button>
                                        </div>

                                        <div className="text-center mb-4">
                                            <span className="small text-muted">Remember your password?</span>
                                            <a className="js-animation-link small" href="javascript:;"
                                               data-target="#login"
                                               data-link-group="idForm"
                                               data-animation-in="slideInUp">Login
                                            </a>
                                        </div>
                                    </div>
                                   */}
        {/* </form>
                            </div>
                        </div>
                
                    </div>
                </div>
            </div>
        </aside>) : null} */}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.userInfo,
    compare: state.compare.compare,
    favourites: state.favourites.favourites,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (userInfo) => dispatch(fetchSetUserInfo(userInfo)),
    getCompare: () => dispatch(fetchCompare()),
    getFavourites: () => dispatch(fetchFavorites()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
