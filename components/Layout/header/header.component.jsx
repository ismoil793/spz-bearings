import React from "react";
import axios from "axios";
import "../../../plugins/axios";
import Link from "next/link";
import Router from "next/router";
import HeaderText from "../../../static/locales/header";
import onClickOutside from "react-onclickoutside";

const uuidv1 = require("uuid/v1");

import Cookies from "universal-cookie";

import url from "../../url";
import {Nav} from "reactstrap";
import Fade from "../../Animations/Fade";
import FadeTop from "../../Animations/FadeTop";

const srcLang = {
   ru: '../../../static/assets/img/img/language_choose/russia.png',
   uz: '../../../static/assets/img/img/language_choose/uzbekistan-1.png',
   en: '../../../static/assets/img/img/language_choose/england.png'
}

const searchResults = [
   {
      name: "Конвейерные ролики",
      link: "/product/konveyernyie-roliki",
   },
   {
      name: "Радиально-упорный шариковый",
      link: "/product/radialno-upornyiy-sharikovyiy",
   },
   {
      name: "Роликовый конический подшипник",
      link: "/product/rolikovyiy-konicheskiy",
   },
   {
      name: "Роликовый радиальный с короткими цилиндрическими роликами",
      link: "/product/rolikovyiy-radialnyiy-s-korotkimi-tsilindricheskimi-rolikami",
   },
   {
      name: "Радиальный роликовый сферический",
      link: "/product/rolikovyiy-radialnyiy-sfericheskiy",
   },
   {
      name: "Шариковый радиальный подшипник",
      link: "/product/sharikovyiy-radialnyiy",
   },
   {
      name: "Шестерни",
      link: "/product/shesterni",
   },
   {
      name: "Упорный или упорно радиальный шариковый подшипник",
      link: "/product/upornyiy-ili-uporno-radialnyiy-sharikovyiy",
   },
   {
      name: "Валлы",
      link: "/product/valyi",
   },
   {
      name: "Втулки",
      link: "/product/vtulki",
   },
]

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
         rotate_logo: false,
         searchProducts: []
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

   handleClickOutside = evt => {
      this.setState({
         search_is_open: false,
      })
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
                this.setState({products: products});
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
                query: {product_id: e.target.value},
             })
             : null;
      }
   };

   handleSearchChange = e => {
      let filteredSearch = []
      if (e.target.value.trim().length) {
         filteredSearch = searchResults.filter(s => {
            return s.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                s.link.toLowerCase().includes(e.target.value.toLowerCase())
         })
      }
      this.setState({
         search_id: e.target.value,
         searchProducts: filteredSearch
      })
   }

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
      let {url} = this.state;

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
                                            <FadeTop delay={0.3}>
                                               <i className="far fa-envelope-open"/>
                                               gpz-uz@mail.ru
                                            </FadeTop>
                                         </a>
                                      </li>
                                      <li>
                                         <a href="tell:451951127851">
                                            <FadeTop delay={0.6}>
                                               <i className="fas fa-phone"/>+(99874) 755-23-59,
                                               755-18-57
                                            </FadeTop>
                                         </a>
                                      </li>
                                      <li>
                                         <a href="#">
                                            <FadeTop delay={0.9}>
                                               <i className="far fa-clock"/>7/7: 9:00 - 18:00
                                            </FadeTop>
                                         </a>
                                      </li>
                                   </ul>
                                </div>
                             </div>
                          </div>
                       </div>
                   ) : null}


                   <div id="fixed-social">
                      <div>
                         <a href="https://www.instagram.com/spzbearings/" className="fixed-facebook" target="_blank">
                            <i className="fab fa-facebook"/>
                            <span>Facebook</span></a>
                      </div>
                      <div>
                         <a href="https://www.instagram.com/spzbearings/" className="fixed-instagram" target="_blank">
                            <i className="fab fa-instagram"/>
                            <span>Instagram</span></a>
                      </div>
                      <div>
                         <a href="https://t.me/spzbearings" className="fixed-telegram" target="_blank">
                            <i className="fab fa-telegram"/>
                            <span>Telegram</span></a>
                      </div>
                   </div>


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
                               <Fade scale={0.5}>
                                  <span>
                                     <img className={`cropped1 animated_rotate-logo`} alt={"SPZ Bearings"}
                                          src="../../../static/assets/img/img/header_logo/logo.png"/>
                                  </span>
                               </Fade>
                            </a>
                         </Link>
                         <div className="collapse navbar-collapse">
                            <ul className="navbar-nav menu">
                               <li className="nav-item">
                                  <Link href={"/"} locale={this.props.locale}>
                                     <a className="nav-link">
                                        <FadeTop delay={0.1}>
                                           {HeaderText[this.props.locale].nav[0]}
                                        </FadeTop>
                                     </a>
                                  </Link>
                               </li>

                               <li className="nav-item dropdown submenu">
                                  <Link href={"/about"} locale={this.props.locale}>
                                     <a className="nav-link">
                                        <FadeTop delay={0.2}>
                                           {HeaderText[this.props.locale].nav[1].dropdown}
                                        </FadeTop>
                                     </a>
                                  </Link>
                                  <ul className="dropdown-menu">
                                     <li className="nav-item active">
                                        <Link href={"/about"} locale={this.props.locale}>
                                           <a className="nav-link">
                                              {HeaderText[this.props.locale].nav[1].elements[0]}
                                           </a>
                                        </Link>
                                     </li>
                                     {/*<li className="nav-item">*/}
                                     {/*   <Link href={"/team"} locale={this.props.locale}>*/}
                                     {/*      <a className="nav-link">*/}
                                     {/*         {HeaderText[this.props.locale].nav[1].elements[1]}*/}
                                     {/*      </a>*/}
                                     {/*   </Link>*/}
                                     {/*</li>*/}
                                     <li className="nav-item">
                                        <Link href={{pathname: "/services/[singlenservice]"}} as={`/services/1`}>
                                           <a className="nav-link">{HeaderText[this.props.locale].nav[1].elements[2]}</a>
                                        </Link>
                                     </li>
                                  </ul>
                               </li>

                               <li className="nav-item">
                                  <Link href={"/services"} locale={this.props.locale}>
                                     <a className="nav-link">
                                        <FadeTop delay={0.3}>
                                           {HeaderText[this.props.locale].nav[2]}
                                        </FadeTop>
                                     </a>
                                  </Link>
                               </li>
                               <li className="nav-item">
                                  <Link href={"/news"} locale={this.props.locale}>
                                     <a className="nav-link">
                                        <FadeTop delay={0.4}>
                                           {HeaderText[this.props.locale].nav[3]}
                                        </FadeTop>
                                     </a>
                                  </Link>
                               </li>
                               <li className="nav-item dropdown submenu">
                                  <Link href={"/shop"} locale={this.props.locale}>
                                     <a className="nav-link">
                                        <FadeTop delay={0.5}>
                                           {HeaderText[this.props.locale].nav[4]}
                                        </FadeTop>
                                     </a>
                                  </Link>
                               </li>
                               <li className="nav-item">
                                  <Link href={"/contacts"} locale={this.props.locale}>
                                     <a className="nav-link">
                                        <FadeTop delay={0.6}>
                                           {HeaderText[this.props.locale].nav[5]}
                                        </FadeTop>
                                     </a>
                                  </Link>
                               </li>
                            </ul>
                         </div>
                      </div>
                      <ul className="list-unstyled navbar-nav navright cart_navbar wrapper_list_dropdown">
                         <li className="list_language_item">
                            <div id="dropdown">
                               <button><img onClick={(e) => {
                                  e.preventDefault();
                                  Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: this.props.locale === 'ru' ? 'ru' : this.props.locale === 'en' ? 'en' : 'uz'})
                               }} className="languages_icons"
                                            src={this.props.locale === 'ru' ? srcLang.ru : this.props.locale === 'en' ? srcLang.en : srcLang.uz}/>
                               </button>
                               <button><img onClick={(e) => {
                                  e.preventDefault();
                                  Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: this.props.locale === 'ru' ? 'uz' : this.props.locale === 'en' ? 'ru' : 'en'})
                               }} className="languages_icons"
                                            src={this.props.locale === 'ru' ? srcLang.uz : this.props.locale === 'en' ? srcLang.ru : srcLang.en}/>
                               </button>
                               <button><img onClick={(e) => {
                                  e.preventDefault();
                                  Router.push(`${Router.router.asPath}`, `${Router.router.asPath}`, {locale: this.props.locale === 'ru' ? 'en' : this.props.locale === 'en' ? 'uz' : 'ru'})
                               }} className="languages_icons"
                                            src={this.props.locale === 'ru' ? srcLang.en : this.props.locale === 'en' ? srcLang.uz : srcLang.ru}/>
                               </button>
                            </div>
                         </li>
                         <li
                             onClick={() =>
                                 this.setState({
                                    search_is_open: true,
                                 })
                             }
                             className={`search ${
                                 this.state.search_is_open ? "open" : ""
                             }`}
                         >
                            <a href="javascript:void(0);">
                               <i className="fas fa-search"/>
                            </a>
                            <form onSubmit={e => e.preventDefault()} className="search-form">
                               <div className="input-group">
                                  <input
                                      type="search"
                                      className="form-control"
                                      value={this.state.search_id}
                                      onChange={this.handleSearchChange}
                                      placeholder={HeaderText[this.props.locale].searchPlaceHolder}
                                  />
                                  <button type="submit">
                                     <i className="fas fa-search"/>
                                  </button>
                               </div>

                               <ul className="search-results">
                                  {
                                     this.state.searchProducts.map(product => (
                                         <Link href={product.link}>
                                            <a>
                                               <li>{product.name}</li>
                                            </a>
                                         </Link>
                                     ))
                                  }
                               </ul>


                            </form>
                         </li>
                         <li
                             className={"burger-menu-btn"}
                             onClick={() =>
                                 this.setState({
                                    menu_is_opened: !this.state.menu_is_opened,
                                 })
                             }
                         >
                            <a href="#" className="menu_btn">
                               <i className="fas fa-align-justify"/>
                            </a>
                         </li>
                      </ul>
                   </Nav>
                </div>
             </header>
          </>
      );
   }
}


export default onClickOutside(Header);
