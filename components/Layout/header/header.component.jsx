import React from "react";
import axios from "axios";
import "../../../plugins/axios";
import Link from "next/link";
import Router from "next/router";
import HeaderText from "../../../static/locales/header";
const uuidv1 = require("uuid/v1");

import Cookies from "universal-cookie";

import url from "../../url";
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
      rotate_logo: false
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
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.menu_is_opened !== this.state.menu_is_opened) {
      document.body.className = this.state.menu_is_opened
        ? "menu-is-opened"
        : "menu-is-closed";
    }
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({rotate_logo: true})
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
              {/* <div class={`language_list_wrapper right_side ${this.props.isHome ? 'home_page_language' : ''}`}>
                            <div class="language_list_home">
                                <button className="btn btn-sucess"><span onClick={(e)=>{e.preventDefault(); Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: 'en'})}}><img className="languages_icons" src="../../../static/assets/img/img/language_choose/england.png"/><p>En</p></span></button>
                                <button className="btn btn-sucess"><span onClick={(e)=>{e.preventDefault(); Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: 'ru'})}}><img className="languages_icons" src="../../../static/assets/img/img/language_choose/russia.png"/><p>Ru</p></span></button>
                                <button className="btn btn-sucess"><span onClick={(e)=>{e.preventDefault(); Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: 'uz'})}}><img className="languages_icons" src="../../../static/assets/img/img/language_choose/uzbekistan-1.png"/><p>Uz</p></span></button>
                </div>
                  </div> */}
                <Link href="/" locale={this.props.locale}>
                  <a className="navbar-brand">
                  <span><img className={`cropped1 animated_rotate-logo`} src="../../../static/assets/img/img/header_logo/logo.png"/></span>
                  </a>
                </Link>
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav menu">
                    <li className="nav-item">
                      {" "}
                      <Link href="/" locale={this.props.locale}>
                        <a className="nav-link">{HeaderText.[this.props.locale].nav[0]}</a>
                      </Link>{" "}
                    </li>
                    <li className="nav-item dropdown submenu">
                      {" "}
                      <Link href="/about" locale={this.props.locale}>
                        <a className="nav-link">{HeaderText.[this.props.locale].nav[1].dropdown} </a>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="nav-item active">
                          {" "}
                          <Link href="/about" locale={this.props.locale}>
                            <a className="nav-link">{HeaderText.[this.props.locale].nav[1].elements[0]}</a>
                          </Link>
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link href="/team" locale={this.props.locale}>
                            <a className="nav-link">{HeaderText.[this.props.locale].nav[1].elements[1]}</a>
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
                            <a className="nav-link">{HeaderText.[this.props.locale].nav[1].elements[2]}</a>
                          </Link>{" "}
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link href="/services" locale={this.props.locale}>
                        <a className="nav-link"> {HeaderText.[this.props.locale].nav[2]} </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link href="/news" locale={this.props.locale}>
                        <a className="nav-link"> {HeaderText.[this.props.locale].nav[3]} </a>
                      </Link>
                    </li>
                    <li className="nav-item dropdown submenu">
                      {" "}
                      <Link href="/shop" locale={this.props.locale}>
                        <a className="nav-link"> {HeaderText.[this.props.locale].nav[4]} </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link href="/contacts" locale={this.props.locale}>
                        <a className="nav-link">{HeaderText.[this.props.locale].nav[5]}</a>
                      </Link>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <ul className="list-unstyled navbar-nav navright cart_navbar wrapper_list_dropdown">
                <li className="list_language_item">
                    <div id="dropdown">
                      <button><img onClick={(e)=>{e.preventDefault(); Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: 'en'})}} className="languages_icons" src="../../../static/assets/img/img/language_choose/england.png"/></button>
                      <button><img onClick={(e)=>{e.preventDefault(); Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: 'ru'})}} className="languages_icons" src="../../../static/assets/img/img/language_choose/russia.png"/></button>
                      <button><img onClick={(e)=>{e.preventDefault(); Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: 'uz'})}} className="languages_icons" src="../../../static/assets/img/img/language_choose/uzbekistan-1.png"/></button>
                    </div>
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
      </>
    );
  }
}


export default Header;
