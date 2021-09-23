import React from "react";
import Layout from "../../components/Layout/layout/layout.component";
import Head from "next/head";
import "react-tabs/style/react-tabs.css";
import Slider from "react-slick";
import { fetchCompare } from "../../redux/actions/compare";
import Portfolio from "../../components/portfolio/portfolio";
import OverlayComponent from "../../components/Layout/overlay/overlay.component";
import homeText from "../../static/locales/home";
import YouTube from 'react-youtube';
import ServicesText from "../../static/locales/services";

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

export function getStaticProps({locale}) {
  return {
    props: {
      locale
    }
  }
}

function SampleNextArrow(props) {
  
  return (
<div onClick={()=>console.log(props)}>arrow{props.locale}</div>
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
  constructor(props) {
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
      showPlayer: false
    };
  }
  componentWillMount() {
    console.log('mount home',this.props)
  }

  handleGrand = () => {
    this.setState({ cartNumber: this.state.cartNumber + 1 });
  };

  handleCompareGrand = () => {
    this.setState({ compareNumber: this.state.compareNumber + 1 });
  };


  _onReady(event) {
    // access to player in all event handlers via event.target
    console.log('event onready', event)
  }

  
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

    var settings2 = {
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 10000000,
      nextArrow: (
        <button class="arrow left">
          <svg width="60px" height="80px" viewBox="0 0 50 80">
            <polyline
              fill="none"
              stroke="#FFFFFF"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="
                        45.63,75.8 0.375,38.087 45.63,0.375 "
            />
          </svg>
        </button>
      ),
      prevArrow: (
        <button class="arrow right">
          <svg width="60px" height="80px" viewBox="0 0 50 80">
            <polyline
              fill="none"
              stroke="#FFFFFF"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="
                        45.63,75.8 0.375,38.087 45.63,0.375 "
            />
          </svg>
        </button>
      ),
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
          {homeText.[this.props.locale].pageTitle}
          </title>

          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="Изготовим и обеспечим подшипниковой продукцией любой сложности"
          />
          <meta
            name="keywords"
            content="Подшипники, валы, втулки, шестерни, конвейерные ролики любой сложности в Узбекистане и не только"
          />
          <meta name="author" content="SPZ-Bearings" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link rel="canonical" href="http://spz-bearings.uz" />
          <link
            rel="alternate"
            href="http://spz-bearings.uz"
            hrefLang="ru_ru"
          />

          <meta
            property="og:title"
            content="Ахунбабаевский завод | Завод по производству подшипниковой продукции"
          />
          <meta
            property="og:description"
            content="Заказать подшипники, валы, втулки, шестерни, конвейерные ролики любой сложности в Узбекистане и не только"
          />
          <meta
            property="og:image"
            content="/static/assets/img/img/favicon.ico"
          />
          <meta property="og:url" content="http://spz-bearings.uz" />

          <meta
            name="google-site-verification"
            content="-aJCq23fZvSXOYJ8AQUwTmgRFgx-rC97EvtFvSt8j8E"
          />
          <meta name="yandex-verification" content="0588fead5dcdbb0e" />
          <link rel="canonical" href="http://spz-bearings.uz" />

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
          <div
            class={`pace ${
              this.props.isLoading ? "pace-active" : "pace-inactive"
            }`}
          >
            <div
              class="pace-progress"
              data-progress-text="100%"
              data-progress="99"
              style={{ transform: "translate3d(100%, 0px, 0px)" }}
            >
              <div class="pace-progress-inner"></div>
            </div>
            <div class="pace-activity"></div>
          </div>

          <div className="body_wrapper main_index">
            <div
              id={`preloader`}
              className={`preloader ${this.props.isLoading ? "" : "load_coplate"}`}
            >
              <div
                class={`product_name ${
                  this.props.isLoading ? "" : "load_coplate"
                }`}
              >
               SPZ Bearings
              </div>
            </div>
          </div>
          <Layout locale={this.props.locale} isLoading={this.props.isLoading} isHome={true}>
            <Slider className="slider-home_page" {...settings2}>
              {bannersImg
                ? bannersImg.map((imgEl, index) => {
                    return (
                      <div
                        className="js-slick-carousel"
                        data-pagi-classes="text-center position-absolute right-0 bottom-0 left-0  justify-content-start mb-3 mb-md-4 offset-xl-3 pl-2 pb-1"
                      >
                        <div
                          className="slider_item pt-0 d-flex align-items-center js-slide bg-img-hero-center slider_bg-img-hero-center"
                          style={{
                            backgroundImage: `url('/static/assets/img/img/podshipniki_proizvodstvo.jpg')`,
                          }}
                        >
                          <div className="container">
                            <div className="slider_text slider_text_width">
                              <h2 data-animation="fadeInUp" data-delay="0.1s">
                                {" "}
                                {homeText.[this.props.locale].slider[index].title}
                              </h2>
                              <p data-animation="fadeInUp" data-delay="0.3s">
                                {" "}
                                {homeText.[this.props.locale].slider[index].description}
                              </p>{" "}
                              <a
                                href="#"
                                className="theme_btn theme_btn_three hover_style1"
                                data-animation="fadeInUp"
                                data-delay="0.5s"
                              >
                                {homeText.[this.props.locale].slider[index].button}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </Slider>
            <OverlayComponent isLoading={this.props.isLoading} locale={this.props.locale}/>
            <div className="services_area main_page pt_200">
            
              <div className="container">
                <div className="div_title_one title_two text-center">
                  <h6 className="title_top">{homeText.[this.props.locale].benefits.title}</h6>
                </div>
                <div className="row services_inner">
                  <div className="col-md-4">
                    <div className="service_item">
                      <div className="media service_icon">
                        {" "}
                        <img className="home_service_img" src="/static/assets/img/img/services/services_home-1.png"/>
                        <div className="media-body">
                          {" "}
                          {homeText.[this.props.locale].benefits.descriptions[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service_item">
                      <div className="media service_icon">
                        {" "}
                        <img className="home_service_img" src="/static/assets/img/img/services/services_home-2.png"/>
                        <div className="media-body">
                        {homeText.[this.props.locale].benefits.descriptions[1]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service_item">
                      <div className="media service_icon">
                        {" "}
                        <img className="home_service_img" src="/static/assets/img/img/services/services_home-3.png"/>
                        <div className="media-body">
                        {homeText.[this.props.locale].benefits.descriptions[2]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h6 className="title_top section_video_title">{homeText.[this.props.locale].video_section_title}</h6>
            {this.state.showPlayer ? 
              <div className="modal_youtube_wrapper">
                <div className="youtube_button_player_wrapper">
                  <button onClick={()=>this.setState({showPlayer: false})} className="youtube_close_button">X</button>
                  <YouTube className="youtube_player" videoId="qrG0N3bC9iU" opts={opts} onReady={this._onReady} />
                </div>
              </div> : null}
            <section class="cons_work_area cons_video_area p-0">                  
              <div class="cons_work_left">
                <div class="cons_about_content">
                  <h6 class="title_top">
                  {ServicesText.[this.props.locale].video_section_title}
                  </h6>
                  <h2 class="title_head">{ServicesText.[this.props.locale].video_section_title_not_main} </h2>
                  <p>
                  {ServicesText.[this.props.locale].video_section_description}
                  </p>
                  <a href="#" class="text_btn" data-text="Контакты">
                  {ServicesText.[this.props.locale].video_section_button}
                  </a>
                </div>
              </div>
              <div class="cons_work_right">
                {" "}
                <img
                  src="/static/assets/img/img/services/video_img.jpg"
                  alt=""
                />{" "}
                <a onClick={(e)=>{e.preventDefault(); this.setState({showPlayer: true})}} href="#" class="video_icon">
                  <span>
                    <i class="fas fa-play"></i>
                  </span>
                </a>{" "}
              </div>
            </section>

            <div className="portfolio_area_three">
              <div className="container">
                <div className="div_title_one home_page">
                  

                  <h2 className="title_head">
                  {homeText.[this.props.locale].product_demand.mainTitle}
                  </h2>
                </div>
                <div className="row div_home-page-portfolio">
                  <Portfolio homeText={homeText} locale={this.props.locale}/>
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
                    {homeText.[this.props.locale].redirect_card.title}
                  </div>{" "}
                  <a
                    href="#"
                    className="theme_btn theme_btn_three hover_style1"
                  >
                    {homeText.[this.props.locale].redirect_card.button}
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
                        loading="lazy"
                        src="/static/assets/img/img/home-14/inovation_img.jpg"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-7">
                    <div className="cons_about_content pr_100">
                      <h6 className="title_top">
                      {homeText.[this.props.locale].technologies_section.sectionTitle}
                      </h6>
                      <h2 className="title_head">{homeText.[this.props.locale].technologies_section.title} </h2>
                      <p>
                      {homeText.[this.props.locale].technologies_section.description}
                      </p>{" "}
                      <a
                        href="#"
                        className="text_btn"
                        data-text="Подробнее ..."
                      >
                        {homeText.[this.props.locale].technologies_section.button}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cons_blog_area">
              <div className="container">
                <div className="div_title_one">
                  <h6 className="title_top">{homeText.[this.props.locale].news_section.sectionTitle}</h6>
                  <h2 className="title_head">{homeText.[this.props.locale].news_section.title}</h2>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="cons_blog_item">
                      {" "}
                      <a href="#" className="img_hover">
                        {" "}
                        <img
                          loading="lazy"
                          src="/static/assets/img/img/home-14/blog_2.jpg"
                          alt=""
                        />{" "}
                      </a>
                      <div className="post_date">{homeText.[this.props.locale].news_section.news[0].title}</div>{" "}
                      <a href="single-blog.html">
                        <h3>
                        {homeText.[this.props.locale].news_section.news[0].description}
                        </h3>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cons_blog_item">
                      {" "}
                      <a href="#" className="img_hover">
                        {" "}
                        <img
                        loading="lazy"
                          src="/static/assets/img/img/home-14/blog_2.jpg"
                          alt=""
                        />{" "}
                      </a>
                      <div className="post_date">{homeText.[this.props.locale].news_section.news[1].title}</div>{" "}
                      <a href="single-blog.html">
                        <h3>
                        {homeText.[this.props.locale].news_section.news[1].description}
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

export default Home;
