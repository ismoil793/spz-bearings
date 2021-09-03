import React from "react";
import axios from "axios";
import Link from "next/link";
import FavouriteButton from "../Favourites/Add_favourites_button";
import CompareButton from "../Compare/CompareButton";
import CartButton from "../Buttons/cartButton";
import ProductButton from "../Buttons/productButton";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import InputMask from "react-input-mask";
import url from "../url";
import ModalImage from "../ModalImage/modalImage";
import Slider from "react-slick";

// const override = css`
//   display: block;
//   margin: 100px auto;
//   border-color: #000000;
// `;

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
      <div id="deal_content" className="deals_timer_content ml-auto">
        <div className="deals_timer_box clearfix" data-target-time="">
          {days ? (
            <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
              <div id="deals_timer1_days" className="deals_timer_days">
                {days}
              </div>
              <span> дней</span>
            </div>
          ) : null}
          <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
            <div id="deals_timer1_hr" className="deals_timer_hr">
              {hours}
            </div>
            <span> часов</span>
          </div>
          <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
            <div id="deals_timer1_min" className="deals_timer_min">
              {minutes}
            </div>
            <span> минут</span>
          </div>
          <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
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

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      singleproduct: props.data,
      value: 1,
      phone: "",
      name: "",
      relatedProducts: [],
      loading: true,
      image_position: 0,
      tabIndex: 0,
      currentSlide: 0,
      slideMoving: false
    };
  }

  callbackFunction = childData => {
    this.setState({ value: childData });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  CallRequest = e => {
    const notyf = new Notyf();
    e.preventDefault();
    axios({
      method: "post",
      url: `${url}/api/call_request/send`,
      data: {
        phone: this.state.phone.replace(/\s/g, "").replace("+", ""),
        name: this.state.name
      }
    })
      .then(response => {
        notyf.success("Ваш запрос принят");
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeCartNum = () => {
    this.props.grand();
  };

  handleCompare = () => {
    this.props.compare();
  };

  changeImage = childData => {
    this.setState({
      image_position: childData
    });
  };

  Increment = (e) => {
    e.preventDefault()
    this.setState({
      value: this.state.value + 1
    })
  }
  
  Decrement = (e) => {
    e.preventDefault()
    this.setState({
      value: this.state.value - 1
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.getProductCard();
    }
  }

  async componentDidMount() {
    setTimeout(() => {
      this.getRelatedProducts();
    }, 300);
  }

  async getProductCard() {
    await axios
      .get(`${url}/api/products`, {
        params: {
          slug: this.props.slug
        }
      })
      .then(response => {
        this.setState({ singleproduct: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    this.getRelatedProducts();
  }

  async getRelatedProducts() {
    await axios
      .get(`${url}/api/products/similar`, {
        params: {
          product_id: this.state.singleproduct.id,
          per_page: 5
        }
      })
      .then(response => {
        this.setState({
          relatedProducts: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  zoomModal = (data) => {
    if (!this.state.slideMoving) {
    this.setState({
      zoomProduct: data
    })}
  }

  ZoomProduct = e => {
    this.setState(prevState => ({
      zoomProduct: !prevState.zoomProduct
    }));
  }



  render() {
    const { singleproduct, phone, name, relatedProducts } = this.state;

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div onClick={onClick} className="js-next d-xs-inline-block u-slick__arrow-normal u-slick__arrow-centered--y fa fa-angle-right u-slick__arrow-classic-inner--right slick-arrow products-page">
        </div>
      );
    }

    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div onClick={onClick} className="js-prev d-xs-inline-block u-slick__arrow-normal u-slick__arrow-centered--y fa fa-angle-left u-slick__arrow-classic-inner--left z-index-9 slick-arrow products-page">
        
        </div>
      );
    }

 

    var settings = {
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <main id="content" role="main">
        {/* <div className="bg-gray-13 bg-md-transparent">
          <div className="container">
            <div className="my-md-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                  <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                    <a href="../home/index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                    <a href="shop.html">Accessories</a>
                  </li>
                  <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                    <a href="shop.html">Headphones</a>
                  </li>
                  <li
                    className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1 active"
                    aria-current="page"
                  >
                    Ultra Wireless S50 Headphones S50 with Bluetooth
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div> */}

        <div className={`container product-page ${this.state.zoomProduct? 'scrollable' : 'not-scrollable'}`}>
          <div className="mb-xl-14 mb-6">
            <div className="row">
              <div className="col-md-5 mb-4 mb-md-0">
                <div
                  id="sliderSyncingNav"
                  className="js-slick-carousel  mb-2"
                  data-infinite="true"
                  data-arrows-classes="d-none d-lg-inline-block u-slick__arrow-classic u-slick__arrow-centered--y rounded-circle"
                  data-arrow-left-classes="fas fa-arrow-left u-slick__arrow-classic-inner u-slick__arrow-classic-inner--left ml-lg-2 ml-xl-4"
                  data-arrow-right-classes="fas fa-arrow-right u-slick__arrow-classic-inner u-slick__arrow-classic-inner--right mr-lg-2 mr-xl-4"
                  data-nav-for="#sliderSyncingThumb"
                >
                  <div className="js-slide post-images-wrapper">
                    {singleproduct.images.length !==0 ?                     
                    <Slider {...settings} afterChange={(e) => {this.setState({currentSlide: e, slideMoving: false})}} beforeChange={()=> this.setState({slideMoving:true})} >
                      {singleproduct.images.map((image, idx) => {return (
                        <img className="post-image"
                        onClick={this.zoomModal}
                        src={image.types.large_default}
                      />
                      )})}
                      </Slider> : null}

                         {this.state.zoomProduct ? <ModalImage hide={this.zoomModal} src={singleproduct.images[this.state.image_position]
                          ? singleproduct.images[this.state.currentSlide]
                              .types.large_default
                          : null}/> : null}
                  </div>
                </div>

                {/* <div id="sliderSyncingThumb" className="js-slick-carousel u-slick u-slick--slider-syncing u-slick--slider-syncing-size u-slick--gutters-1 u-slick--transform-off"
                              data-infinite="true"
                              data-slides-show="5"
                              data-is-thumbs="true"
                              data-nav-for="#sliderSyncingNav">
                              <div className="js-slide" style={{cursor: 'pointer'}}>
                                  <img className="img-fluid" src="/static/assets/img/720X660/img1.jpg" alt="Image Description"/>
                              </div>
                              <div className="js-slide" style={{cursor: 'pointer'}}>
                                  <img className="img-fluid" src="/static/assets/img/720X660/img2.jpg" alt="Image Description"/>
                              </div>
                              <div className="js-slide" style={{cursor: 'pointer'}}>
                                  <img className="img-fluid" src="/static/assets/img/720X660/img3.jpg" alt="Image Description"/>
                              </div>
                              <div className="js-slide" style={{cursor: 'pointer'}}>
                                  <img className="img-fluid" src="/static/assets/img/720X660/img4.jpg" alt="Image Description"/>
                              </div>
                              <div className="js-slide" style={{cursor: 'pointer'}}>
                                  <img className="img-fluid" src="/static/assets/img/720X660/img5.jpg" alt="Image Description"/>
                              </div>
                          </div> */}
              </div>
              <div className="col-md-7 mb-md-6 mb-lg-0">
                <div className="mb-2">
                  <div className="border-bottom mb-3 pb-md-1 pb-3">
                    <a
                      href="#"
                      className="font-size-12 text-gray-5 mb-2 d-inline-block"
                    >
                       {singleproduct.country ? singleproduct.country.name : null}
                    </a>
                    <h2 className="font-size-25 text-lh-1dot2">
                      {singleproduct.name}
                    </h2>
                    {/* <div className="mb-2">
                                      <a className="d-inline-flex align-items-center small font-size-15 text-lh-1" href="#">
                                          <div className="text-warning mr-2">
                                              <small className="fas fa-star"></small>
                                              <small className="fas fa-star"></small>
                                              <small className="fas fa-star"></small>
                                              <small className="fas fa-star"></small>
                                              <small className="far fa-star text-muted"></small>
                                          </div>
                                          <span className="text-secondary font-size-13">(3 customer reviews)</span>
                                      </a>
                                  </div> */}
                  </div>
                  <div className="flex-horizontal-center flex-wrap mb-4">
                    <FavouriteButton
                      product_name={singleproduct.name}
                      product_id={singleproduct.id}
                    />
                    <CompareButton
                      product_name={singleproduct.name}
                      product_id={singleproduct.id}
                    />
                  </div>
                  {/* <div className="mb-2">
                    <ul className="font-size-14 pl-3 ml-1 text-gray-110">
                      <li>4.5 inch HD Touch Screen (1280 x 720)</li>
                      <li>Android 4.4 KitKat OS</li>
                      <li>1.4 GHz Quad Core™ Processor</li>
                      <li>20 MP Electro and 28 megapixel CMOS rear camera</li>
                    </ul>
                  </div> */}
                  <p>{singleproduct.description_short}</p>
                  <p>
                    <strong>Вес</strong>: {singleproduct.weight} кг
                  </p>
                  <div className="mb-4">
                    <div className="d-flex align-items-baseline">
                      <ins className="font-size-36 text-decoration-none">
                        {singleproduct.random_shop.discount
                          ? singleproduct.random_shop.discount.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : singleproduct.random_shop.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                         сум
                      </ins>
                      {singleproduct.random_shop.discount ? (
                        <del className="font-size-20 ml-2 text-gray-6">
                          {singleproduct.random_shop.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                           сум
                        </del>
                        
                      ) : null}
                        <div className="no-nds">
                                  Без учета НДС
                                 </div>
                    </div>
                  </div>

                  <div className="d-md-flex align-items-end mb-3">
                    <div className="max-width-150 mb-4 mb-md-0">
                      <h6 className="font-size-14">Количество</h6>
                      <div className="border rounded-pill py-2 px-3 border-color-1">
                                          <div className="js-quantity row align-items-center">
                                              <div className="col">
                                                  <input className="js-result form-control h-auto border-0 rounded p-0 shadow-none" type="text" value={this.state.value}/>
                                              </div>
                                              <div className="col-auto pr-1">
                                                  <a onClick={this.Decrement} className="js-minus btn btn-icon btn-xs btn-outline-secondary rounded-circle border-0" href="javascript:;">
                                                      <small className="fas fa-minus btn-icon__inner"></small>
                                                  </a>
                                                  <a  onClick={this.Increment} className="js-plus btn btn-icon btn-xs btn-outline-secondary rounded-circle border-0" href="javascript:;">
                                                      <small className="fas fa-plus btn-icon__inner"></small>
                                                  </a>
                                              </div>
                                          </div>
                                      </div>
                   
                    </div>
                    <ProductButton
                      handler={this.changeCartNum}
                      cartNumber={this.state.cartNumber}
                      selectedNumber={this.state.value}
                      item_shop_id={singleproduct.random_shop.item_shop_id}
                      product_name={singleproduct.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <Tabs
              selectedIndex={this.state.tabIndex}
              onSelect={tabIndex => this.setState({ tabIndex })}
              // id="tabs"
              className="position-relative position-md-static px-md-6"
            >
              <TabList className="nav nav-classic nav-tab nav-tab-lg justify-content-xl-center flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble border-0 pb-1 pb-xl-0 mb-n1 mb-xl-0">
                {this.state.tabIndex == 0 ? (
                  <>
                    <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                      <a className="nav-link active">Полное Описание</a>
                    </Tab>
                    <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                      <a className="nav-link">Характеристики</a>
                    </Tab>
                    <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                      <a className="nav-link">Связаться с нами</a>
                    </Tab>
                  </>
                ) : this.state.tabIndex == 1 ? (
                  <>
                    <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                      <a className="nav-link">Полное Описание</a>
                    </Tab>
                    <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                      <a className="nav-link active">Характеристики</a>
                    </Tab>
                    <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                      <a className="nav-link">Связаться с нами</a>
                    </Tab>
                  </>
                ) : 
                <>
                <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                  <a className="nav-link">Полное Описание</a>
                </Tab>
                <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                  <a className="nav-link">Характеристики</a>
                </Tab>
                <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                  <a className="nav-link active">Связаться с нами</a>
                </Tab>
              </>}
              </TabList>

              <div className="borders-radius-17 border p-4 mt-4 mt-md-0 px-lg-10 py-lg-9">
                <TabPanel className="tab-content active show">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: singleproduct.description
                    }}
                  ></div>
                </TabPanel>
                <TabPanel>
                  <h3 className="font-size-18 mb-4">
                    {" "}
                    Характеристики продукта: {singleproduct.name}
                  </h3>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <tbody>
                        {typeof singleproduct.features == "object"
                          ? singleproduct.features.map(feature => (
                              <tr key={feature.id}>
                                <th className="px-4 px-xl-5 border-top-0">
                                  {feature.name}
                                </th>
                                <td className="border-top-0">
                                  {feature.value}
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="row mb-8">
                    {/* <div className="col-md-6">
                                      <div className="mb-3">
                                          <h3 className="font-size-18 mb-6">Based on 3 reviews</h3>
                                          <h2 className="font-size-30 font-weight-bold text-lh-1 mb-0">4.3</h2>
                                          <div className="text-lh-1">overall</div>
                                      </div>

                                      
                                      <ul className="list-unstyled">
                                          <li className="py-1">
                                              <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="text-warning text-ls-n2 font-size-16" style={{width: '80px'}}>
                                                          <small className="fas fa-star"></small>
                                                          <small className="fas fa-star"></small>
                                                          <small className="fas fa-star"></small>
                                                          <small className="fas fa-star"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="progress ml-xl-5" style={{height: '10px', width: '200px'}}>
                                                          <div className="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto text-right">
                                                      <span className="text-gray-90">205</span>
                                                  </div>
                                              </a>
                                          </li>
                                          <li className="py-1">
                                              <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="text-warning text-ls-n2 font-size-16" style={{width: '80px'}}>
                                                          <small className="fas fa-star"></small>
                                                          <small className="fas fa-star"></small>
                                                          <small className="fas fa-star"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="progress ml-xl-5" style={{height: '10px', width: '200px'}}>
                                                          <div className="progress-bar" role="progressbar" style={{width: '53%'}} aria-valuenow="53" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto text-right">
                                                      <span className="text-gray-90">55</span>
                                                  </div>
                                              </a>
                                          </li>
                                          <li className="py-1">
                                              <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="text-warning text-ls-n2 font-size-16" style={{width: '80px'}}>
                                                          <small className="fas fa-star"></small>
                                                          <small className="fas fa-star"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="progress ml-xl-5" style={{height: '10px', width: '200px'}}>
                                                          <div className="progress-bar" role="progressbar" style={{width: '20%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto text-right">
                                                      <span className="text-gray-90">23</span>
                                                  </div>
                                              </a>
                                          </li>
                                          <li className="py-1">
                                              <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="text-warning text-ls-n2 font-size-16" style={{width: '80px'}}>
                                                          <small className="fas fa-star"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="progress ml-xl-5" style={{height: '10px', width: '200px'}}>
                                                          <div className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto text-right">
                                                      <span className="text-muted">0</span>
                                                  </div>
                                              </a>
                                          </li>
                                          <li className="py-1">
                                              <a className="row align-items-center mx-gutters-2 font-size-1" href="javascript:;">
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="text-warning text-ls-n2 font-size-16" style={{width: '80px'}}>
                                                          <small className="fas fa-star"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                          <small className="far fa-star text-muted"></small>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto mb-2 mb-md-0">
                                                      <div className="progress ml-xl-5" style={{height: '10px', width: '200px'}}>
                                                          <div className="progress-bar" role="progressbar" style={{width: '1%'}} aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
                                                      </div>
                                                  </div>
                                                  <div className="col-auto text-right">
                                                      <span className="text-gray-90">4</span>
                                                  </div>
                                              </a>
                                          </li>
                                      </ul>
                                
                                  </div> */}
                    <div className="col-md-12">
                      <h3 className="font-size-18 mb-5">
                        У вас есть вопросы? Специалисты нашей технической
                        поддержки свяжутся с Вами в течении 120 секунд!{" "}
                      </h3>

                      <form onSubmit={this.CallRequest} className="js-validate">
                        <div className="js-form-message form-group mb-3 row">
                          <div className="col-md-4 col-lg-3">
                            <label for="inputName" className="form-label">
                              Имя <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.name}
                              name="name"
                              onChange={this.handleChange}
                              id="inputName"
                              aria-label=""
                              required
                              data-msg="Please enter your name."
                              data-error-className="u-has-error"
                              data-success-className="u-has-success"
                            />
                          </div>
                        </div>
                        <div className="js-form-message form-group mb-3 row">
                          <div className="col-md-4 col-lg-3">
                            <label for="emailAddress" className="form-label">
                              Номер телефона{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="col-md-8 col-lg-9">
                            <InputMask
                              mask="+999 99 999 99 99"
                              onChange={this.handleChange}
                              name="phone"
                              value={phone}
                              placeholder="Ваш номер телефона"
                              className="form-control"
                              id="phone"
                              required
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="offset-md-4 offset-lg-3 col-auto">
                            <button
                              type="submit"
                              className="btn btn-primary-dark  transition-3d-hover"
                            >
                              Отправить
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>

          {relatedProducts ? (
            <div className="mb-6">
              <div className="d-flex justify-content-between align-items-center border-bottom border-color-1 flex-lg-nowrap flex-wrap mb-4">
                <h3 className="section-title mb-0 pb-2 font-size-22">
                  Похожие товары
                </h3>
              </div>
              <ul className="row list-unstyled products-group no-gutters">
                {typeof relatedProducts == "object"
                  ? relatedProducts.map(request => (
                      <li className=" col-6 col-md-3 col-xl-2gdot4-only col-wd-2 product-item">
                        <div className="product-item__outer h-100">
                          <div className="product-item__inner px-xl-4 p-3">
                            <div className="product-item__body pb-xl-2">
                              <div className="mb-2">
                                <a className="font-size-12 text-gray-5">
                                {request.country ? request.country.name : null}
                                </a>
                              </div>
                              <Link
                                href={{
                                  pathname: "/product/[product]"
                                }}
                                as={`/product/${request.web_url.slice(31)}`}
                              >
                                <h5 className="mb-1 product-item__title">
                                  <a className="text-blue font-weight-bold">
                                    {request.name}
                                  </a>
                                </h5>
                              </Link>
                              <Link
                                href={{
                                  pathname: "/product/[product]"
                                }}
                                as={`/product/${request.web_url.slice(31)}`}
                              >
                                <div className="mb-2">
                                  <a className="d-block text-center">
                                    <img
                                      className="img-fluid"
                                      src={
                                        request.images[0].types.medium_default
                                      }
                                      alt="Image Description"
                                    />
                                  </a>
                                </div>
                              </Link>
                              <div className="flex-center-between mb-1">
                                {request.random_shop.discount ? (
                                  <div className="prodcut-price d-flex align-items-center flex-wrap position-relative">
                                    <ins className="font-size-20 text-red text-decoration-none mr-2">
                                      {request.random_shop.price
                                        .toString()
                                        .replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          " "
                                        )}{" "}
                                      сум
                                    </ins>
                                    <del className="font-size-12 tex-gray-6 position-absolute bottom-100">
                                      {" "}
                                      {request.random_shop.discount
                                        ? request.random_shop.discount.price
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              " "
                                            )
                                        : null}{" "}
                                      сум
                                    </del>
                                  </div>
                                ) : (
                                  <div className="prodcut-price">
                                    <div className="text-gray-100">
                                      {request.random_shop.price
                                        .toString()
                                        .replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          " "
                                        )}{" "}
                                      сум
                                    </div>
                                  </div>
                                )}

                                <CartButton
                              
                                  item_shop_id={request.random_shop.item_shop_id}
                                  product_name={request.name}
                                />
                              </div>
                            </div>

                            <div className="product-item__footer">
                              <div className="border-top pt-2 flex-center-between flex-wrap">
                                <CompareButton
                                  product_name={request.name}
                                  product_id={request.id}
                                />
                                <FavouriteButton
                                  product_name={request.name}
                                  product_id={request.id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          ) : null}
        </div>
      </main>
    );
  }
}

export default ProductCard;