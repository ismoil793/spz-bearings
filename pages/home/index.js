import React from "react";
import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import "react-tabs/style/react-tabs.css";
import Slider from "react-slick";
import axios from "axios";
import Link from "next/link";
import Cookies from "universal-cookie";
import url from "../../components/url";
import { connect } from "react-redux";
import { fetchCompare } from "../../redux/actions/compare";
import Portfolio from "../../components/portfolio/portfolio";

const BrandLink = (props) => (
  <Link
    href={{
      pathname: `/shop/[id]`,
      query: { brand_id: props.brandID },
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
    <div
      onClick={onClick}
      className="js-next d-none d-sm-inline-block u-slick__arrow-normal u-slick__arrow-centered--y fa fa-angle-right u-slick__arrow-classic-inner--right slick-arrow mr-5 arrow-left"
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="js-prev d-none d-sm-inline-block u-slick__arrow-normal u-slick__arrow-centered--y fa fa-angle-left u-slick__arrow-classic-inner--left z-index-9 slick-arrow mr-5 arrow-right"
    ></div>
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
      news: [],
    };
  }

  componentDidMount() {
    this.props.getCompare();
    this.setState({
      width: window.innerWidth,
    });

    const cookies = new Cookies();
    axios
      .get(`${url}/api/posts`, {
        params: {
          per_page: 3,
        },
      })
      .then((response) => {
        this.setState({
          news: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${url}/api/home`)
      .then((response) => {
        this.setState({
          home_data: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${url}/api/comparison/features`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
        },
      })
      .then((response) => {
        this.setState({ compareNumber: response.data.data.products.length });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${url}/api/banners`)
      .then((response) => {
        this.setState({
          banners: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${url}/api/cart/show`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
        },
      })
      .then((response) => {
        this.setState({ cartNumber: response.data.data.items.length });
      })
      .catch((error) => {
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
    const filterPrice = ["5 000 000", "3 000 000", "1 000 000"];
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
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
      ],
    };

    const bannersImg = [
      "/static/assets/img/img/podshipniki_proizvodstvo.jpg",
      "/static/assets/img/img/podshipniki_proizvodstvo.jpg",
      "/static/assets/img/img/podshipniki_proizvodstvo.jpg",
    ];

    const categoriesPng = [
      "..//static/assets/img/home_categories/baking.png",
      "..//static/assets/img/home_categories/refrigerator.png",
      "..//static/assets/img/home_categories/meatGrinder.png",
      "..//static/assets/img/home_categories/waffle.png",
      "..//static/assets/img/home_categories/meatGrinderM.png",
      "..//static/assets/img/home_categories/cooking.png",
      "",
      "..//static/assets/img/home_categories/vending-machine.png",
    ];
    var settings2 = {
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 10000,
      nextArrow: <button class="arrow left">
                    <svg width="60px" height="80px" viewBox="0 0 50 80">
                      <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
                        45.63,75.8 0.375,38.087 45.63,0.375 "/>
                    </svg>  
                  </button>,
      prevArrow: <button class="arrow right">
                    <svg width="60px" height="80px" viewBox="0 0 50 80">
                      <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
                        45.63,75.8 0.375,38.087 45.63,0.375 "/>
                    </svg>  
                  </button>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true,
          },
        },
      ],
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
      dots: true,
      dotsClass:
        "d-flex justify-content-between border-bottom border-color-1 flex-md-nowrap flex-wrap border-sm-bottom-0 dots-wrapper",
      customPaging: function (i) {
        return (
          <a className="nav-link text-gray-8 dot" href="#">
            {filterPrice[i]} сум
          </a>
        );
      },
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            infinite: true,
          },
        },
      ],
    };
    return (
      <>
        <Head>
          <title>
            Интернет-магазин кухонного оборудования в Ташкенте | Kitmach
            Premium.UZ
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
            <div id={`preloader`} className={`preloader ${this.props.isLoading ? '' : "load_coplate"}`}>
              <div class="product_name">Bearings</div>
            </div>        
          </div>
          <Layout isLoading={this.props.isLoading} isHome={true}>
          <Slider className="slider-home_page" {...settings2}>
            {bannersImg
              ? bannersImg.map((imgEl) => {
                  return (
                    <div
                      className="js-slick-carousel"
                      data-pagi-classes="text-center position-absolute right-0 bottom-0 left-0  justify-content-start mb-3 mb-md-4 offset-xl-3 pl-2 pb-1"
                    >
                      <div className="slider_item pt-0 d-flex align-items-center js-slide bg-img-hero-center"                 
                      style={{backgroundImage: `url('/static/assets/img/img/podshipniki_proizvodstvo.jpg')`,}}>
                <div className="container">
                  <div className="slider_text slider_text_width">
                    <h2 data-animation="fadeInUp" data-delay="0.1s">
                      {" "}
                      Завод функционирует <br /> с 1986 - года{" "}
                    </h2>
                    <p data-animation="fadeInUp" data-delay="0.3s">
                      {" "}
                      Обеспечивает своей продукцией не только внутренний рынок
                      Узбекистана, а также внешний рынок
                    </p>{" "}
                    <a
                      href="#"
                      className="theme_btn theme_btn_three hover_style1"
                      data-animation="fadeInUp"
                      data-delay="0.5s"
                    >
                      О Нас
                    </a>
                  </div>
                </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </Slider>
          <div className="mobile_menu d-flex flex-wrap align-items-end">
            <div className="close_btn">X</div>
            <ul className="list-unstyled mb_menu wd_scroll">
              <li>
                <a href="index.html">Главная</a>
              </li>
              <li className="menu-item-has-children">
                {" "}
                <a href="#"> О Нас </a>
                <ul className="list-unstyled">
                  <li>
                    <a href="about.html">История Завода</a>
                  </li>
                  <li>
                    <a href="team.html">Руководство</a>
                  </li>
                  <li>
                    <a href="service-details.html">Технический Центр</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                {" "}
                <a href="#"> Сервисы</a>
                <ul className="list-unstyled">
                  <li>
                    {" "}
                    <a href="services.html">Сервисы</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="service-details.html">Детально Сервисы</a>{" "}
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                {" "}
                <a href="#"> Новости </a>
                <ul className="list-unstyled">
                  <li>
                    {" "}
                    <a href="blog.html">Новости</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="single-blog.html">Детально Новости</a>{" "}
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                {" "}
                <a href="#"> Продукция </a>
                <ul className="list-unstyled">
                  <li>
                    {" "}
                    <a href="shop.html">Продукция</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="product-details.html">Детально продукция</a>{" "}
                  </li>
                </ul>
              </li>
              <li>
                <a href="contact.html">Контакты</a>
              </li>
            </ul>
            <ul className="list-unstyled social_links">
              <li>
                <a href="#" title="">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" title="">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" title="">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" title="">
                  <i className="fab fa-dribbble"></i>
                </a>
              </li>
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
                    <div className="media service_icon">
                      {" "}
                      <i className="icon-modern-architecture"></i>
                      <div className="media-body">
                        {" "}
                        Только <br />
                        качественные комплектующие
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="service_item">
                    <div className="media service_icon">
                      {" "}
                      <i className="icon-technical"></i>
                      <div className="media-body">
                        {" "}
                        Сочетание высокого <br /> качества, надёжности и
                        обоснованной цены{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="service_item">
                    <div className="media service_icon">
                      {" "}
                      <i className="icon-vector"></i>
                      <div className="media-body">
                        {" "}
                        Полный <br /> технологический цикл{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="portfolio_area_three">
            <div className="container">
              <div className="div_title_one home_page">
                <h6 className="title_top">Галлерея</h6>
                <h2 className="title_head">
                  Продукция восстребована в секторах
                </h2>
              </div>
              <div className="row div_home-page-portfolio">
                <Portfolio/>
                {/* <div className="col-lg-6">
                  <div
                    className="portfolio_item"
                    data-displacement="/static/assets/img/img/home-14/pr_img1.jpg"
                    data-intensity="-0.8"
                  >
                    {" "}
                    <img
                      src="/static/assets/img/img/home-14/pr_img1.jpg"
                      alt=""
                    />{" "}
                    <img
                      src="/static/assets/img/img/home-14/pr_img1.jpg"
                      alt=""
                    />{" "}
                    <a href="#" className="hover_content">
                      <div className="text">
                        <h5>Железнодорожная промышленность</h5>
                      </div>
                    </a>{" "}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="portfolio_item"
                    data-displacement="/static/assets/img/img/home-14/auto.jpg"
                    data-intensity="-0.8"
                  >
                    {" "}
                    <img
                      src="/static/assets/img/img/home-14/auto.jpg"
                      alt=""
                    />{" "}
                    <img
                      src="/static/assets/img/img/home-14/auto.jpg"
                      alt=""
                    />{" "}
                    <a href="#" className="hover_content">
                      <div className="text">
                        <h5>Автопромышленность</h5>
                      </div>
                    </a>{" "}
                  </div>
                </div>
                <div className="col-lg-6 portfolio_col">
                  <div
                    className="portfolio_item"
                    data-displacement="/static/assets/img/img/home-14/energy.jpg"
                    data-intensity="-0.8"
                  >
                    {" "}
                    <img
                      src="/static/assets/img/img/home-14/energy.jpg"
                      alt=""
                    />{" "}
                    <img
                      src="/static/assets/img/img/home-14/energy.jpg"
                      alt=""
                    />{" "}
                    <a href="#" className="hover_content">
                      <div className="text">
                        <h5>Энергетическая промышленность</h5>
                      </div>
                    </a>{" "}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="portfolio_item"
                    data-displacement="/static/assets/img/img/home-14/pr_img4.jpg"
                    data-intensity="-0.8"
                  >
                    {" "}
                    <img
                      src="/static/assets/img/img/home-14/pr_img4.jpg"
                      alt=""
                    />{" "}
                    <img
                      src="/static/assets/img/img/home-14/pr_img4.jpg"
                      alt=""
                    />{" "}
                    <a href="#" className="hover_content">
                      <div className="text">
                        <h5>Индустриальная промышленность</h5>
                      </div>
                    </a>{" "}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="cons_action_area_two">
            <div className="container">
              <div className="cons_action_info cons_action_info_white justify-content-between">
                <div className="text">
                  {" "}
                  Наша продукция восстребована и в других секторах.
                </div>{" "}
                <a href="#" className="theme_btn theme_btn_three hover_style1">
                  Узнать больше
                </a>
              </div>
            </div>
          </div>
          <div className="cons_mission_area main_page_index">
            <div className="container">
              <div className="row flex-row-reverse align-items-center">
                <div className="col-lg-6 col-md-5">
                  <div className="service_img">
                    {" "}
                    <img
                      src="/static/assets/img/img/home-14/inovation_img.jpg"
                      alt=""
                    />{" "}
                  </div>
                </div>
                <div className="col-lg-6 col-md-7">
                  <div className="cons_about_content pr_100">
                    <h6 className="title_top">
                      Мы используем самые современные технологии
                    </h6>
                    <h2 className="title_head">Мы в погоне за иновациями </h2>
                    <p>
                      Для поддержания лидерских позиций на рынке мы постоянно
                      стремимся к совершенству так и в технолгиях, так и в
                      ассортименте продукции.{" "}
                    </p>{" "}
                    <a href="#" className="text_btn" data-text="Подробнее ...">
                      Подробнее ...
                    </a>
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
                  <div className="cons_blog_item">
                    {" "}
                    <a href="#" className="img_hover">
                      {" "}
                      <img src="/static/assets/img/img/home-14/blog_2.jpg" alt="" />{" "}
                    </a>
                    <div className="post_date">Расширение</div>{" "}
                    <a href="single-blog.html">
                      <h3>
                        Мы выпускаем <br /> ещё одну линейку продуктов
                      </h3>
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="cons_blog_item">
                    {" "}
                    <a href="#" className="img_hover">
                      {" "}
                      <img src="/static/assets/img/img/home-14/blog_2.jpg" alt="" />{" "}
                    </a>
                    <div className="post_date">Деятельность</div>{" "}
                    <a href="single-blog.html">
                      <h3>
                        Наш завод выполнил <br /> крупный заказ для Компании ...
                      </h3>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Layout>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompare: () => dispatch(fetchCompare()),
  };
};

export default connect(null, mapDispatchToProps)(Home);
