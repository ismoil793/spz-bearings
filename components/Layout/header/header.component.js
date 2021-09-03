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
import Register from "../../Auth/Register";
import Login from "../../Auth/Login";
import { connect } from "react-redux"
import { fetchSetUserInfo } from '../../../redux/actions/userInfo'
import CartPopup from '../../Cart/popupCart'
import AsideCategory from "../../Categories/sidecategories";
import SearchMobile from '../../Search/search_mobile'
import { fetchCompare } from "../../../redux/actions/compare";
import { fetchFavorites } from "../../../redux/actions/favorites";
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
      userInfo: {}
    };
  
  }

  Callback = () => {
    this.setState(prevState => ({
      mobile_menu: !prevState.mobile_menu
    }));
  };

  HideRegister = (data) => {
    this.setState({
     isRegister: data
    });
  };

  HideAside = (data) => {
    this.setState({
     isAside: data
    });
  };

  HideCategories = (data) => {
    this.setState({
     isCategories: data
    });
  };

  HideLogin = (data) => {
    this.setState({
     isLogin: data
    });
  };

  HidePopUp = (data) => {
    this.setState({
     isPopupCart: data
    });
  };

  Search = () => {
    axios
      .get(`${url}/api/search`, {
        params: {
          search: this.state.searching
        }
      })
      .then(response => {
        //   this.setState({ searched: response.data.products });
        let products = [];
        if (response.data.products.length) {
          for (let i = 0; i < response.data.products.length; i++) {
            products.push({
              value: response.data.products[i].id,
              text: response.data.products[i].name
            });
          }
        }
        setTimeout(() => {
          this.setState({ products: products });
        }, 100);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    {
      e.target.value
        ? Router.push({
            pathname: `/productPage/${e.target.text}`,
            query: { product_id: e.target.value }
          })
        : null;
    }
  };

  Register = e => {
    this.setState(prevState => ({
      isRegister: !prevState.isRegister
    }));
  };

  handleMobileSearch = e => {
    this.setState(prevState => ({
      isMobileSearch: !prevState.isMobileSearch
    }));
  };

  Login = e => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin
    }));
  };

  AsideCategory = e => {
    this.setState(prevState => ({
      isAside: !prevState.isAside
    }));
  };

  PopupCart = e => {
    this.setState(prevState => ({
      isPopupCart: !prevState.isPopupCart
    }));
  };

  Categories = e => {
    this.setState(prevState => ({
      isCategories: !prevState.isCategories
    }));
  };

  componentDidMount() {
    const cookies = new Cookies();
    const current = new Date();
    const nextYear = new Date();
    if (!this.props.compare) {
      this.props.getCompare()
    }

    if (!this.props.user.user.id) {
      this.props.getFavourites()
    }

    nextYear.setFullYear(current.getFullYear() + 1);

    if (!cookies.get("device_token") || !cookies.get("device_type")) {
      let device_id = uuidv1();
      cookies.set("device_token", device_id, {
        path: "/",
        expires: nextYear
      });
      cookies.set("device_type", "web");
    }
    axios({
      method: "post",
      url: `${url}/api/device/create`,
      data: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        user_id: cookies.get("user_id")
      }
    })
      .then(response => {})
      .catch(error => {});
    if (Object.keys(this.props.user.user).length === 0) {
      axios
      .get(`${url}/api/user/info`)
      .then(response => {
        this.props.setUserInfo(response.data.data)
        // this.setState({ userInfo: response.data.data });
        
      })
      .catch(error => {
        console.log(error)
      }); 
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
          <div className="u-header__section">
            <div className="u-header-topbar py-2 d-xl-block">
              <div className="container">
                <div className="d-flex align-items-center">
                  {/* <button onClick={() => console.log(this.props.favourites)}>favourites</button> */}
                  <div className="topbar-left">
                  <li className="header_icons-list col d-xl-none px-2 px-sm-3 position-static">
                                            <a onClick={this.handleMobileSearch} id="searchClassicInvoker" className="font-size-22 text-gray-90 text-lh-1 btn-text-secondary active" href="javascript:;" role="button" data-toggle="tooltip" data-placement="top" title="" aria-controls="searchClassic" aria-haspopup="true" aria-expanded="true" data-unfold-target="#searchClassic" data-unfold-type="css-animation" data-unfold-duration="300" data-unfold-delay="300" data-unfold-hide-on-scroll="true" data-unfold-animation-in="slideInUp" data-unfold-animation-out="fadeOut" data-original-title="Search">
                                                <span className="ec ec-search"></span>
                                            </a>

                                          {this.state.isMobileSearch ? (
                                            <SearchMobile/>
                                            ) : null}
                                         
                  </li>
                    <a
                      href="#"
                      className="text-gray-110  d-none font-size-13 hover-on-dark"
                    >
                      Огромный ассортимент кухонного оборудования
                    </a>
                  </div>
                  <div className="topbar-right ml-auto">
                    <ul className="list-inline mb-0">
                      <li className=" list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border d-none">
                      <Link href="/contact">
                        <a className="u-header-topbar__nav-link">
                          <i className="ec ec-map-pointer mr-1"></i> 
                          Наши магазины
                        </a>
                        </Link>
                      </li>
                     {/* <li className="list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border">
                      <Link href="/tracking">
                        <a className="u-header-topbar__nav-link" >
                          <i className="ec ec-transport mr-1"></i> 
                          Следить за заказом
                        </a>
                        </Link>
                      </li>  */}
   
                      
                      { !this.props.user.user.id ? 
                      <li className="list-inline-item mr-0 u-header-topbar__nav-item u-header-topbar__nav-item-border">
                        <a
                          id="sidebarNavToggler"
                          href="javascript:;"
                          role="button"
                          className="u-header-topbar__nav-link"
                          aria-controls="sidebarContent"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-unfold-event="click"
                          data-unfold-hide-on-scroll="false"
                          data-unfold-target="#sidebarContent"
                          data-unfold-type="css-animation"
                          data-unfold-animation-in="fadeInRight"
                          data-unfold-animation-out="fadeOutRight"
                          data-unfold-duration="500"
                        >
                          
                          <i className="ec ec-user mr-1"></i>{" "}
                          <span onClick={this.Register}>Регистрация</span>
                          <span className="text-gray-50">{" "} или</span>{" "}
                          <span onClick={this.Login}>Логин</span> 
                        </a>
                      </li>
                    : <div className="header_user-info_block">
                      <span className="header_user-info_span">                        
                        <span className="header_user-info_text">
                          <Link href='/user'>
                            <span className="header_profile_link">
                              <p className="header_name name">{this.props.user.user.first_name} </p><p className="header_name surname">{this.props.user.user.last_name}</p>
                            </span>
                          </Link>
                        </span>                        
                        <div className="header_img-block">
                        <Link href='/user'>
                          <img className="header_user_img" src={this.props.user.user.image ? this.props.user.user.image.url : '../../../static/assets/img/userProfile.png'} alt='photo'/>
                          </Link>
                          </div>
                      </span>
                      
                    {/* <button onClick={()=>console.log(this.props.user.user)}>props</button> */}
                    </div>
                    } 
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2 py-xl-5">
              <div className="container my-0dot5 my-xl-0">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <nav className="navbar navbar-expand u-header__navbar py-0 justify-content-xl-between max-width-270 min-width-270">
                      <Link href="/">
                        <a
                          className="order-1 order-xl-0 navbar-brand u-header__navbar-brand u-header__navbar-brand-center"
                          href="#"
                        >
                          <img src="/static/assets/img/75X75/logo.png" />
                        </a>
                      </Link>
                      <button
                      onClick={this.AsideCategory}
                        id="sidebarHeaderInvokerMenu"
                        type="button"
                        className={this.state.isAside ? "navbar-toggler d-block btn u-hamburger mr-3 mr-xl-0 target-of-invoker-has-unfolds active" : "navbar-toggler d-block btn u-hamburger mr-3 mr-xl-0 target-of-invoker-has-unfolds"}
                        aria-controls="sidebarHeader"
                        aria-haspopup="true"
                        aria-expanded={this.state.isAside ? " true" : "false"}
                        data-unfold-event="click"
                        data-unfold-hide-on-scroll="false"
                        data-unfold-target="#sidebarHeader1"
                        data-unfold-type="css-animation"
                        data-unfold-animation-in="fadeInLeft"
                        data-unfold-animation-out="fadeOutLeft"
                        data-unfold-duration="500"
                      >
                        <span
                        
                          id="hamburgerTriggerMenu"
                          className="u-hamburger__box"
                        >
                          <span className="u-hamburger__inner"></span>
                        </span>
                      </button>
                    </nav>
                    {this.state.isAside ? <AsideCategory hide={this.HideAside}/>  : null}
               
                   
                  </div>

                 <Search />

                  <div className="col col-xl-auto text-right text-xl-left pl-0 pl-xl-3 position-static header_icons-wrapper">
                    <div className="d-inline-flex">
                      <ul className="d-flex list-unstyled mb-0 align-items-center">
                    
                      <li className="header_icons-list col d-xl-block">
                        <Link href="/compare">
                          <a
                            href=""
                            className="text-gray-90 position-relative d-flex"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Compare"
                          >
                            <i className="icon-header font-size-22 ec ec-compare"></i>
                            <span className="header_count bg-lg-down-black width-22 height-22 bg-primary position-absolute d-flex align-items-center justify-content-center rounded-circle left-12 top-8 font-weight-bold font-size-12">
                                                      {!this.props.compare.length ? 0
                                                            : this.props.compare.length
                                                      }
                                                </span>
                          </a>
                          </Link>
                        </li>
                        <li className="header_icons-list col d-xl-block">
                        <Link href="/wishlist">
                          <a
                            href=""
                            className="text-gray-90"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Favorites"
                          >
                            <i className="icon-header font-size-22 ec ec-favorites"></i>
                            { this.props.user.user.id ?
                            <span className="header_count bg-lg-down-black width-22 height-22 bg-primary position-absolute d-flex align-items-center justify-content-center rounded-circle top-8 font-weight-bold font-size-12 favourites-count">
                                                      {!this.props.favourites.length ? 0
                                                            : this.props.favourites.length
                                                      }
                            </span> : null }
                          </a>
                          </Link>
                        </li>
                        <li className="header_icons-list col d-xl-block px-2 px-sm-3">
                        <Link href={this.props.user.user.id ? '/user' : '/login'}>
                          <a
                            className="text-gray-90"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="My Account"
                          >
                            <i className="icon-header font-size-22 ec ec-user"></i>
                          </a>
                          </Link>
                        </li>

                  

                        <Link href="/cart"> 
                      <li className="header_icons-list col pr-xl-0 px-2 px-sm-3 d-xl-none">
                                            <a  className="text-gray-90 position-relative d-flex " data-toggle="tooltip" data-placement="top" title="Cart">
                                                <i className="icon-header font-size-22 ec ec-shopping-bag"></i>
                                                <span className="header_count bg-lg-down-black width-22 height-22 bg-primary position-absolute d-flex align-items-center justify-content-center rounded-circle left-12 top-8 font-weight-bold font-size-12">
                                                      {!this.props.cart.cart ? 0
                                                            : this.props.cart.cart.total_count
                                                      }
                                                </span>
                                              
                                            </a>
                                        </li>
                                        </Link>
                                        <li  className="col pr-xl-0 px-2 px-sm-3 d-none d-xl-block">
                                            <div onClick={this.PopupCart} id="basicDropdownHoverInvoker" className="text-gray-90 position-relative d-flex pointer" data-toggle="tooltip" data-placement="top" title="Cart"
                                                aria-controls="basicDropdownHover"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-unfold-event="click"
                                                data-unfold-target="#basicDropdownHover"
                                                data-unfold-type="css-animation"
                                                data-unfold-duration="300"
                                                data-unfold-delay="300"
                                                data-unfold-hide-on-scroll="true"
                                                data-unfold-animation-in="slideInUp"
                                                data-unfold-animation-out="fadeOut">
                                                <i className="icon-header font-size-22 ec ec-shopping-bag"></i>
                                                <span className="header_count bg-lg-down-black width-22 height-22 bg-primary position-absolute d-flex align-items-center justify-content-center rounded-circle left-12 top-8 font-weight-bold font-size-12"> {
                                                         !this.props.cart.cart ? 0
                                                            : this.props.cart.cart.total_count
                                                      }</span>
                                                {/* <span className="d-none d-xl-block font-weight-bold font-size-16 text-gray-90 ml-3">$1785.00</span> */}
                                            </div>
                                            {this.state.isPopupCart ? <CartPopup hide={this.HidePopUp} /> : null }
                                         </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-none d-xl-block container">
              <div className="row">
                <div className="col-md-auto d-none d-xl-block">
                  <div className="max-width-270 min-width-270">
                    <div onClick={this.Categories} id="basicsAccordion">
                      <div className="card border-0">
                        <div
                          className="card-header card-collapse border-0"
                          id="basicsHeadingOne"
                        >
                          <button
                            type="button"
                            className="btn-link btn-remove-focus btn-block d-flex card-btn py-3 text-lh-1 px-4 shadow-none btn-primary rounded-top-lg border-0 font-weight-bold text-gray-90"
                            data-toggle="collapse"
                            data-target="#basicsCollapseOne"
                            aria-expanded="true"
                            aria-controls="basicsCollapseOne"
                          >
                            <span className="ml-0 text-gray-90 mr-2">
                              <span className="fa fa-list-ul"></span>
                            </span>
                            <span  className="pl-1 text-gray-90">Все Категории</span>
                          </button>
                        </div>
                     {this.state.isCategories ? <Category hide={this.HideCategories} /> : null} 
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">
                    <div
                      id="navBar"
                      className="collapse navbar-collapse u-header__navbar-collapse"
                    >
                      <ul className="navbar-nav u-header__navbar-nav">
                        <li
                          className="nav-item hs-has-mega-menu u-header__nav-item"
                          data-event="click"
                          data-animation-in="slideInUp"
                          data-animation-out="fadeOut"
                          data-position="left"
                        >
                        <Link href="/about">
                          <a
                            id="homeMegaMenu"
                            className="nav-link u-header__nav-link"
                            href="#"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            О нас
                          </a>
                        </Link>
                       
                        </li> 

                        <li className="nav-item u-header__nav-item">
                        <Link href="/news">
                          <a
                            className="nav-link u-header__nav-link"
                            href="#"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-labelledby="pagesSubMenu"
                          >
                            Новости
                          </a>
                          </Link>
                        </li>

                        <li className="nav-item u-header__nav-item">
                        <Link href="/contact">
                          <a
                            className="nav-link u-header__nav-link"
                            href="#"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-labelledby="blogSubMenu"
                          >
                            Контакты
                          </a>
                          </Link>
                        </li>

                        {/* <li className="nav-item u-header__nav-item">
                          <a
                            className="nav-link u-header__nav-link"
                            href="#"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Ремонт оборудования
                          </a>
                        </li> */}

                        <li className="nav-item u-header__nav-last-item">
                          <a className="text-gray-90" href="#" target="_blank">
                            Бесплатная доставка по городу Ташкент
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
{this.state.isLogin || this.state.isRegister ? (
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
                                </form>
                            </div>
                        </div>
                
                    </div>
                </div>
            </div>
        </aside>) : null}

    
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
     cart: state.cart,
     user: state.userInfo,
     compare: state.compare.compare,
     favourites: state.favourites.favourites
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (userInfo) => dispatch(fetchSetUserInfo(userInfo)),
    getCompare: () => dispatch(fetchCompare()),
    getFavourites: () => dispatch(fetchFavorites())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)