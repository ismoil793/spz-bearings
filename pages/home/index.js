import React from "react";
import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NewProducts from "../../components/RequestProductsHome/newProduct";
import PopularProduct from "../../components/RequestProductsHome/popularProduct";
import DiscountProducts from "../../components/RequestProductsHome/discountProduct";
import Less2products from "../../components/RequestProductsHome/lessthan2";
import Less5products from "../../components/RequestProductsHome/lessthan5";
import Less10products from "../../components/RequestProductsHome/lessthan10";
import RecommendedProducts from "../../components/RequestProductsHome/recommendedProduct";
import ProductWeek from "../../components/HomeProductWeek/homeProductWeek";
import Slider from "react-slick";
import axios from "axios";
import Link from "next/link";
import Cookies from "universal-cookie";
import url from "../../components/url";
import CategoryProducts from "../../components/RequestProductsHome/categoryProduct";
import { connect } from "react-redux";
import { fetchCompare } from "../../redux/actions/compare";

const BrandLink = props => (
  <Link
    href={{
      pathname: `/shop/[id]`,
      query: { brand_id: props.brandID }
    }}
    as={`/shop/${props.id}`}
  >
    <div className="brand_image">
      <img style={{ width: "100%" }} src={props.image} alt="" />
    </div>
  </Link>
);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className="js-next d-none d-sm-inline-block u-slick__arrow-normal u-slick__arrow-centered--y fa fa-angle-right u-slick__arrow-classic-inner--right slick-arrow mr-5 arrow-left">
     
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className="js-prev d-none d-sm-inline-block u-slick__arrow-normal u-slick__arrow-centered--y fa fa-angle-left u-slick__arrow-classic-inner--left z-index-9 slick-arrow mr-5 arrow-right">
    
    </div>
  );
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      slider: [],
      banners: [],
      brands: [],
      home_data: [],
      tabIndex: 0,
      tabNew: 0,
      cartNumber: 0,
      compareNumber: 0,
      width: null,
      news: []
    };
  }

  componentDidMount() {
    this.props.getCompare();
    this.setState({
      width: window.innerWidth
    });

    const cookies = new Cookies();
    axios
      .get(`${url}/api/posts`, {
        params: {
          per_page: 3
        }
      })
      .then(response => {
        this.setState({
          news: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${url}/api/home`)
      .then(response => {
        this.setState({
          home_data: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${url}/api/comparison/features`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        this.setState({ compareNumber: response.data.data.products.length });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${url}/api/banners`)
      .then(response => {
        this.setState({
          banners: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${url}/api/cart/show`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        this.setState({ cartNumber: response.data.data.items.length });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleGrand = () => {
    this.setState({ cartNumber: this.state.cartNumber + 1 });
  };

  handleCompareGrand = () => {
    this.setState({ compareNumber: this.state.compareNumber + 1 });
  };

  render() {
    const { news } = this.state;
    const filterPrice = ['5 000 000', '3 000 000', '1 000 000']
    var brands = {
      infinite: true,
      speed: 2000,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        }
      ]
    };

    const bannersImg = [
      "/static/assets/img/home_main-slider/product_banner_1.png",
      "/static/assets/img/home_main-slider/product_banner_2.png",
      "/static/assets/img/home_main-slider/product_banner_3.png",
      "/static/assets/img/home_main-slider/product_banner_4.png",
      "/static/assets/img/home_main-slider/product_banner_5.png",
    ]

    const categoriesPng = [
      "../../static/assets/img/home_categories/baking.png",
      "../../static/assets/img/home_categories/refrigerator.png",
      "../../static/assets/img/home_categories/meatGrinder.png",
      "../../static/assets/img/home_categories/waffle.png",
      "../../static/assets/img/home_categories/meatGrinderM.png",
      "../../static/assets/img/home_categories/cooking.png",
      "",
      "../../static/assets/img/home_categories/vending-machine.png"
    ]

    var settings2 = {
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true
          }
        }
      ]
    };

    var settings = {
      infinite: true,      
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      dots:true,
      dotsClass: "d-flex justify-content-between border-bottom border-color-1 flex-md-nowrap flex-wrap border-sm-bottom-0 dots-wrapper",
      customPaging: function(i) {
        return (
        <a className="nav-link text-gray-8 dot" href="#">
          {filterPrice[i]} сум
        </a>
        )
      },
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true
          }
        }
      ]
    };
    return (
      <>
        <Head>
          <title>
            Интернет-магазин кухонного оборудования в Ташкенте | Kitmach Premium.UZ
          </title>

          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="Купить печи, фритюрницы, самовары, мясорубки в Ташкенте по доступной цене и бесплатной доставкой? Легко на Kitmach Premium.uz!"
          />
          <meta
            name="keywords"
            content="Онлайн-магазин, Кухонное оборудование, Ташкент, ресторанное оборудование, Фастфут, магазины, печи, тестомесы, "
          />
          <meta name="author" content="Kitmach Premium" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link rel="canonical" href="https://Kitmach Premium.uz/" />
          <link
            rel="alternate"
            href="https://Kitmach Premium.uz/"
            hrefLang="ru_ru"
          />

          <meta
            property="og:title"
            content="Интернет-магазин кухонного оборудоваия в Ташкенте | Kitmach Premium.UZ"
          />
          <meta
            property="og:description"
            content="Купить фритюрницы, тестомесы, печи, кухонные печи, холодильники в Ташкенте по доступной цене и бесплатной доставкой? Легко на Kitmach Premium.uz!"
          />
          <meta
            property="og:image"
            content="/static/assets/template/avtech/images/ogimage.png"
          />
          <meta property="og:url" content="https://Kitmach Premium.uz/" />

          <meta
            name="google-site-verification"
            content="-aJCq23fZvSXOYJ8AQUwTmgRFgx-rC97EvtFvSt8j8E"
          />
          <meta name="yandex-verification" content="0588fead5dcdbb0e" />
          <link rel="canonical" href="https://Kitmach Premium.uz" />

          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/template/avtech/plugins/slick-1.8.0/slick.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/template/avtech/styles/responsive.css"
          />
        </Head>
        <div>
        <div className="body_wrapper main_index">
        <div id="preloader">
            <div className="product_name">Bearings</div>
        </div>
        <div className="header_big_logo">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="list-unstyled menu_contact_info">
                                <li><a href="mailto:gpz-uz@mail.ru"> <i
                                            className="far fa-envelope-open"></i>gpz-uz@mail.ru</a> </li>
                                <li><a href="tell:451951127851"><i className="fas fa-phone"></i>+(99874) 755-23-59,
                                        755-18-57</a></li>
                                <li><a href="#"><i className="far fa-clock"></i>7/7: 9:00 - 18:00</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg" id="header">
                <div className="container"> <a className="navbar-brand big_logo" href="index.html"><img src="../static/assets/img/img/home-14/logo.png"
                            alt="logo" /></a> <a className="navbar-brand" href="index.html"><img src="../static/assets/img/img/home-one/logo.png"
                            alt="logo" /></a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav menu">
                            <li className="nav-item"> <a className="nav-link" href="index.html">Главная</a> </li>
                            <li className="nav-item dropdown submenu active"> <a href="#" className="nav-link"> О Нас </a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item active"> <a href="about.html" className="nav-link">История Завода</a>
                                    </li>
                                    <li className="nav-item"> <a href="team.html" className="nav-link">Наша Команда</a> </li>
                                    <li className="nav-item"> <a href="service-details.html" className="nav-link">Технический Центр</a> </li>
                                    </ul>
                                </li>
                            </ul>
                            <li className="nav-item dropdown submenu"> <a href="#" className="nav-link"> Сервисы </a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item"> <a href="services.html" className="nav-link">Сервисы</a> </li>
                                    <li className="nav-item"> <a href="service-details.html" className="nav-link">Детально Сервисы</a> </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown submenu"> <a className="nav-link" href="#"> Новости </a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item"> <a href="blog.html" className="nav-link">Новости</a> </li>
                                    <li className="nav-item"> <a href="single-blog.html" className="nav-link">Детально Новости</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown submenu"> <a className="nav-link" href="#"> Продукция </a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item"> <a href="shop.html" className="nav-link">Продукция</a> </li>
                                    <li className="nav-item"> <a href="product-details.html" className="nav-link">Детально продукция</a> </li>
                                </ul>
                            </li>
                            <li className="nav-item"> <a className="nav-link" href="contact.html">Контакты</a> </li>
                        </div>
                    </div>
                    <ul className="list-unstyled navbar-nav navright cart_navbar">
                        <li className="shoping-cart"> <a href="#"><i className="icon-bikini60s_cart"></i></a>
                            <ul className="dropdown-menu">
                                <li className="cart-single-item clearfix">
                                    <div className="cart-img"> <img src="../static/assets/img/img/cart1.jpg" alt="styler"/> </div>
                                    <div className="cart-content text-left">
                                        <p className="cart-title"><a href="#">Lorem, ipsum dolor.</a></p>
                                        <p><del>$10.00</del> - $8.50</p>
                                    </div>
                                    <div className="cart-remove"> <a href="#" className="action">X</a> </div>
                                </li>
                                <li className="cart-single-item clearfix">
                                    <div className="cart-img"> <img src="../static/assets/img/img/cart2.jpg" alt="styler"/> </div>
                                    <div className="cart-content text-left">
                                        <p className="cart-title"><a href="#">Lorem, ipsum dolor.</a></p>
                                        <p>$12.00</p>
                                    </div>
                                    <div className="cart-remove"> <a href="#" className="action">X</a> </div>
                                </li>
                                <li className="cart_f">
                                    <div className="cart-pricing">
                                        <p className="total">Subtotal :<span className="p-total text-right">$20.50</span></p>
                                    </div>
                                    <div className="cart-button"> <button className="theme_btn hover_style1">Посмотреть в корзину</button>
                                        <button className="theme_btn theme_btn_three hover_style1">Оформить заказ</button> </div>
                                </li>
                            </ul>
                        </li>
                        <li className="search"> <a href="javascript:void(0);"><i className="icon-bikini60s_search"></i></a>
                            <form action="#" method="get" className="search-form">
                                <div className="input-group"> <input type="search" className="form-control"
                                        placeholder="Searching for..."/> <button type="submit"><i
                                            className="fas fa-long-arrow-alt-right"></i></button> </div>
                            </form>
                        </li>
                        <li> <a href="#" className="menu_btn"><i className="icon-bikini60s_menu"></i></a> </li>
                    </ul>
                </nav>
            </div>
        </div> 
        <div className="main_slider_area">
            <div className="slider-progress">
                <div className="slider_progress_bar"></div>
            </div>
            <div className="main_slider">
                <div className="slider_item pt-0 d-flex align-items-center"
                    style={{backgroundImage: `url('../static/assets/img/img/podshipniki_proizvodstvo.jpg')`}}>
                    <div className="overlay_bg"></div>
                    <div className="container">
                        <div className="slider_text slider_text_width">
                            <h2 data-animation="fadeInUp" data-delay="0.1s"> Завод функционирует <br/> с 1986 - года </h2>
                            <p data-animation="fadeInUp" data-delay="0.3s"> Обеспечивает своей продукцией не только внутренний рынок Узбекистана, а также внешний рынок
                                 </p> <a href="#"
                                className="theme_btn theme_btn_three hover_style1" data-animation="fadeInUp"
                                data-delay="0.5s">О Нас</a>
                        </div>
                    </div>
                </div>
                <div className="slider_item pt-0 d-flex align-items-center"
                    style={{backgroundImage: `url('../static/assets/img/img/podshipniki_proizvodstvo.jpg')`}}>
                    <div className="overlay_bg"></div>
                    <div className="container">
                        <div className="slider_text slider_text_width">
                            <h2 data-animation="fadeInUp" data-delay="0.1s"> Мы строго следим <br/> за качеством продукции </h2>
                            <p data-animation="fadeInUp" data-delay="0.3s"> Наша продукция отвечает всем стандартам качества
                                 </p> <a href="#" className="theme_btn theme_btn_three hover_style1"
                                data-animation="fadeInUp" data-delay="0.5s">Просмотреть сертификаты</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slider_nav"> <i className="fas fa-angle-left slider_left_arrow"></i> <i
                    className="fas fa-angle-right slider_right_arrow"></i> </div>
        </div> 
        <div className="mobile_menu d-flex flex-wrap align-items-end">
            <div className="close_btn">X</div>
            <ul className="list-unstyled mb_menu wd_scroll">
                <li><a href="index.html">Главная</a></li>
                <li className="menu-item-has-children"> <a href="#"> О Нас </a>
                    <ul className="list-unstyled">
                        <li><a href="about.html">История Завода</a></li>
                        <li><a href="team.html">Руководство</a></li>
                        <li><a href="service-details.html">Технический Центр</a></li>
                    </ul>
                </li>
                <li className="menu-item-has-children"> <a href="#"> Сервисы</a>
                    <ul className="list-unstyled">
                        <li> <a href="services.html">Сервисы</a> </li>
                        <li> <a href="service-details.html">Детально Сервисы</a> </li>
                    </ul>
                </li>
                <li className="menu-item-has-children"> <a href="#"> Новости </a>
                    <ul className="list-unstyled">
                        <li> <a href="blog.html">Новости</a> </li>
                        <li> <a href="single-blog.html">Детально Новости</a> </li>
                    </ul>
                </li>
                <li className="menu-item-has-children"> <a href="#"> Продукция </a>
                    <ul className="list-unstyled">
                        <li> <a href="shop.html">Продукция</a> </li>
                        <li> <a href="product-details.html">Детально продукция</a> </li>
                    </ul>
                </li>
                <li><a href="contact.html">Контакты</a></li>
            </ul>
            <ul className="list-unstyled social_links">
                <li><a href="#" title=""><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#" title=""><i className="fab fa-twitter"></i></a></li>
                <li><a href="#" title=""><i className="fab fa-instagram"></i></a></li>
                <li><a href="#" title=""><i className="fab fa-dribbble"></i></a></li>
            </ul>
        </div>
        <div className="body_capture"></div>

        <div className="services_area main_page pt_200">
            <div className="container">
                <div className="div_title_one title_two text-center">
                    <h6 className="title_top">Наши преимущества</h6>
                </div>
                <div className="row services_inner">
                    <div className="col-md-4">
                        <div className="service_item">
                            <div className="media service_icon"> <i className="icon-modern-architecture"></i>
                                <div className="media-body"> Только <br/>качественные комплектующие</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="service_item">
                            <div className="media service_icon"> <i className="icon-technical"></i>
                                <div className="media-body"> Сочетание высокого <br/> качества, надёжности и обоснованной цены </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="service_item">
                            <div className="media service_icon"> <i className="icon-vector"></i>
                                <div className="media-body"> Полный <br/> технологический цикл </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="portfolio_area_three">
            <div className="container">
                <div className="div_title_one">
                    <h6 className="title_top">Галлерея</h6>
                    <h2 className="title_head">Продукция восстребована в секторах</h2>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="portfolio_item" data-displacement="../static/assets/img/img/home-14/pr_img1.jpg"
                            data-intensity="-0.8"> <img src="../static/assets/img/img/home-14/pr_img1.jpg" alt=""/> <img
                                src="../static/assets/img/img/home-14/pr_img1.jpg" alt=""/> <a href="#" className="hover_content">
                                <div className="text">
                                    <h5>Железнодорожная промышленность</h5>
                                </div>
                            </a> </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="portfolio_item" data-displacement="../static/assets/img/img/home-14/auto.jpg"
                            data-intensity="-0.8"> <img src="../static/assets/img/img/home-14/auto.jpg" alt=""/> <img
                                src="../static/assets/img/img/home-14/auto.jpg" alt=""/> <a href="#" className="hover_content">
                                <div className="text">
                                    <h5>Автопромышленность</h5>
                                </div>
                            </a> </div>
                    </div>
                    <div className="col-lg-6 portfolio_col">
                        <div className="portfolio_item" data-displacement="../static/assets/img/img/home-14/energy.jpg"
                            data-intensity="-0.8"> <img src="../static/assets/img/img/home-14/energy.jpg" alt=""/> <img
                                src="../static/assets/img/img/home-14/energy.jpg" alt=""/> <a href="#" className="hover_content">
                                <div className="text">
                                    <h5>Энергетическая промышленность</h5>
                                </div>
                            </a> </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="portfolio_item" data-displacement="../static/assets/img/img/home-14/pr_img4.jpg"
                            data-intensity="-0.8"> <img src="../static/assets/img/img/home-14/pr_img4.jpg" alt=""/> <img
                                src="../static/assets/img/img/home-14/pr_img4.jpg" alt=""/> <a href="#" className="hover_content">
                                <div className="text">
                                    <h5>Индустриальная промышленность</h5>
                                </div>
                            </a> </div>
                    </div>
                </div>
            </div>
        </div> 
        <div className="cons_action_area_two">
            <div className="container">
                <div className="cons_action_info cons_action_info_white justify-content-between">
                    <div className="text"> Наша продукция восстребована и в других секторах.
                    </div> <a href="#" className="theme_btn theme_btn_three hover_style1">Узнать больше</a>
                </div>
            </div>
        </div>
        <div className="cons_mission_area main_page_index">
            <div className="container">
                <div className="row flex-row-reverse align-items-center">
                    <div className="col-lg-6 col-md-5">
                        <div className="service_img"> <img src="../static/assets/img/img/home-14/inovation_img.jpg" alt=""/> </div>
                    </div>
                    <div className="col-lg-6 col-md-7">
                        <div className="cons_about_content pr_100">
                            <h6 className="title_top">Мы используем самые современные технологии</h6>
                            <h2 className="title_head">Мы в погоне за иновациями </h2>
                            <p>Для поддержания лидерских позиций на рынке мы постоянно стремимся к совершенству так и в технолгиях, так и в ассортименте продукции. </p> <a href="#" className="text_btn"
                                data-text="Подробнее ...">Подробнее ...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div className="cons_blog_area">
            <div className="container">
                <div className="div_title_one">
                    <h6 className="title_top">Новости</h6>
                    <h2 className="title_head">Последние новости</h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="cons_blog_item"> <a href="#" className="img_hover"> <img
                                    src="assets/img/home-14/blog_2.jpg" alt=""/> </a>
                            <div className="post_date">Расширение</div> <a href="single-blog.html">
                                <h3>Мы выпускаем <br/> ещё одну линейку продуктов</h3>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="cons_blog_item"> <a href="#" className="img_hover"> <img
                                    src="assets/img/home-14/blog_2.jpg" alt=""/> </a>
                            <div className="post_date">Деятельность</div> <a href="single-blog.html">
                                <h3>Наш завод выполнил <br/> крупный заказ для Компании ...</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div className="footer_area">
            <div className="footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="f_widget f_about_widget pr_100"> <a href="index.html" className="f_logo"> <img
                                        src="../static/assets/img/img/home-one/logo_footer.png" alt=""/> </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="f_widget f_link_widget">
                                <h3 className="f_title">Полезные Ссылки</h3>
                                <ul className="list-unstyled f_link f_link_two">
                                    <li><a href="#">Главная</a></li>
                                    <li><a href="#">Продукция</a></li>
                                    <li><a href="#">О Нас</a></li>
                                    <li><a href="#">Сервисы</a></li>
                                    <li><a href="#">Контакты</a></li>
                                    <li><a href="#">Партнеры</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="f_widget f_subscribe_widget">
                                <h3 className="f_title">Обратная связь</h3>
                                <form action="#" className="f_subscribe"> <input type="text" className="form-control"
                                        placeholder="Ваш email - мы свяжемся"/> <button type="submit"
                                        className="s_btn"><i className="icon-email"></i></button> </form>
                                <p>Мы готовы к сотрудничеству</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom border_top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-7">
                            <p className="copy_text"> <a href="index.html">Главная</a></p>
                        </div>
                        <div className="col-sm-5 text-right"> <a href="#" className="go_top">go back up <i
                                    className="fas fa-angle-up"></i></a> </div>
                    </div>
                </div>
            </div>
        </div> 
    </div> 
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompare: () => dispatch(fetchCompare())
  }
}

export default connect(null, mapDispatchToProps)(Home);