import React from "react";
import Slider from "react-slick";
import axios from "axios";

import Link from "next/link";
import MainButtonProductCart from "./buttonWeek";
import url from "../url";
import Countdown from "react-countdown";



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

      <div className="js-countdown d-flex justify-content-center" >
       {days ? (
        <div className="text-lh-1">
        <div className="text-gray-2 font-size-30 bg-gray-4 py-2 px-2 rounded-sm mb-2">
          <span className="js-cd-hours">{days}</span>
        </div>
        <div className="text-gray-2 font-size-12 text-center">
          дней
        </div>
      </div> ) : null}
      <div className="mx-1 pt-1 text-gray-2 font-size-24">:</div>
      <div className="text-lh-1">
        <div className="text-gray-2 font-size-30 bg-gray-4 py-2 px-2 rounded-sm mb-2">
          <span className="js-cd-hours">{hours}</span>
        </div>
        <div className="text-gray-2 font-size-12 text-center">
          Часов
        </div>
      </div>
      <div className="mx-1 pt-1 text-gray-2 font-size-24">:</div>
      <div className="text-lh-1">
        <div className="text-gray-2 font-size-30 bg-gray-4 py-2 px-2 rounded-sm mb-2">
          <span className="js-cd-minutes">{minutes}</span>
        </div>
        <div className="text-gray-2 font-size-12 text-center">
          Минут
        </div>
      </div>
      <div className="mx-1 pt-1 text-gray-2 font-size-24">:</div>
      <div className="text-lh-1">
        <div className="text-gray-2 font-size-30 bg-gray-4 py-2 px-2 rounded-sm mb-2">
          <span className="js-cd-seconds">{seconds}</span>
        </div>
        <div className="text-gray-2 font-size-12 text-center">
          Секунд
        </div>
      </div>
    </div>


      // <div id="deal_content" className="deals_timer_content ml-auto">
      //   <div className="deals_timer_box clearfix" data-target-time="">
      //     {days ? (
      //       <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
      //         <div id="deals_timer1_days" className="deals_timer_days">
      //           {days}
      //         </div>
      //         <span> дней</span>
      //       </div>
      //     ) : null}
      //     <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
      //       <div id="deals_timer1_hr" className="deals_timer_hr">
      //         {hours}
      //       </div>
      //       <span> часов</span>
      //     </div>
      //     <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
      //       <div id="deals_timer1_min" className="deals_timer_min">
      //         {minutes}
      //       </div>
      //       <span> минут</span>
      //     </div>
      //     <div style={{ paddingLeft: "5px" }} className="deals_timer_unit">
      //       <div id="deals_timer1_sec" className="deals_timer_sec">
      //         {seconds}
      //       </div>
      //       <span> сек</span>
      //     </div>
      //   </div>
      // </div>
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
      <a>{props.id}</a>
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
      <div className="deals_image">
        {" "}
        <a>
          <img src={props.image} alt={props.slug} />
        </a>
      </div>
    </Link>
  </>
);
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className="deals_slider_next deals_slider_nav_right">
      <i className="fas fa-chevron-right ml-auto"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className="deals_slider_prev deals_slider_nav_left">
      <i className="fas fa-chevron-left ml-auto"></i>
    </div>
  );
}

export default class ProductWeek extends React.Component {
  handleParent = () => {
    this.props.change();
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      // <Slider {...settings}>
      //   { this.props.week_products
      //     ? this.props.week_products.product_request.map(pop => (
      //         <div key={pop.id} className="owl-item deals_item">
      //           <ImageLink
      //             productID={pop.id}
      //             slug={pop.slug}
      //             image={pop.images[0].types.large_default}
      //           />
      //           {/* <div className="deals_image"><img src={pop.images[0].types.large_default} alt=""/></div> */}
      //           <div className="deals_content">
      //             <div className="deals_info_line d-flex flex-row justify-content-start">
      //               <div className="deals_item_category">
      //                 <a href="shop.html">{pop.class.name}</a>
      //               </div>
      //               <div className="deals_item_price_a ml-auto">
      //                 {pop.brand.name}
      //               </div>
      //             </div>
      //             <div className="deals_info_line d-flex flex-row justify-content-start">
      //               <div className="deals_item_name">
      //                 <ProductLink
      //                   price={pop.random_shop.price}
      //                   slug={pop.slug}
      //                   id={pop.name}
      //                   productID={pop.id}
      //                 />{" "}
      //               </div>
      //             </div>
      //             <div className="deals_item_price ml-auto">
      //               {pop.random_shop.price
      //                 .toString()
      //                 .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
      //               сум{" "}
      //             </div>

      //             <div className="deals_timer d-flex flex-row align-items-center justify-content-start">
      //               {/* <MainButtonProductCart productss_id={pop.random_shop.item_shop_id} /> */}
      //               <MainButtonProductCart
      //                 handleChild={this.handleParent}
      //                 cartNumber={this.props.cartNumber}
      //                 productss_id={pop.random_shop.item_shop_id}
      //               />
      //             </div>
      //           </div>
      //         </div>
      //       ))
      //     : null}
      // </Slider>
      // <div className="col-md-auto mb-6 mb-md-0">
      <>
        {this.props.week_products ? (
          <div className="p-3 border border-width-2 border-primary borders-radius-20 bg-white min-width-370">
            <div className="d-flex justify-content-between align-items-center m-1 ml-2">
              <h3 className="font-size-22 mb-0 font-weight-normal text-lh-28 max-width-120">
                Товар недели
              </h3>
              <div className="d-flex align-items-center flex-column justify-content-center bg-primary rounded-pill height-75 width-75 text-lh-1">
                <span className="font-size-12">Сэкономьте</span>
                <div className="font-size-20 font-weight-bold">{this.props.week_products.product_request[0].random_shop.discount ? this.props.week_products.product_request[0].random_shop.discount.percent : 10}%</div>
              </div>
            </div>
         
           
              <Link
              href={{
                pathname: "/product/[product]"
              }}
              as={`/product/${this.props.week_products.product_request[0].slug}`}
            >
                <div className="mb-4">
                  <a className="d-block text-center">
                    <img
                      className="img-fluid"
                      src={
                        this.props.week_products.product_request[0]
                          ? this.props.week_products.product_request[0]
                              .images[0].types.medium_default
                          : null
                      }
                      alt="Image Description"
                    />
                  </a>
                </div>
                </Link>
                <Link
              href={{
                pathname: "/product/[product]"
              }}
              as={`/product/${this.props.week_products.product_request[0].slug}`}
            >
                <h5 className="mb-2 font-size-14 text-center mx-auto max-width-180 text-lh-18">
                  <a
                   
                    className="text-blue font-weight-bold"
                  >
                    {this.props.week_products.product_request[0].name}
                  </a>
                </h5>
                </Link>
                <Link
              href={{
                pathname: "/product/[product]"
              }}
              as={`/product/${this.props.week_products.product_request[0].slug}`}
            >
              
                <div className="d-flex align-items-center justify-content-center mb-3">
               
                  <del className="font-size-18 mr-2 text-gray-2">
                  {this.props.week_products.product_request[0].random_shop.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                    сум
                  </del>
                  <ins className="font-size-30 text-red text-decoration-none">
                 

                    {this.props.week_products.product_request[0].random_shop
                      .discount
                      ? this.props.week_products.product_request[0].random_shop.discount.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      : (this.props.week_products.product_request[0].random_shop.price/1.1).toFixed()
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "} сум
                  </ins>
               
                </div>
              </Link>
            
            
            <div className="mb-3 mx-2">
              <div className="rounded-pill bg-gray-3 height-20 position-relative">
                <span className="position-absolute left-0 top-0 bottom-0 rounded-pill w-30 bg-primary"></span>
              </div>
            </div>
            <div className="mb-2">
              <h6 className="font-size-15 text-gray-2 text-center mb-3">
                Предложение заканчивается через:
              </h6>
             {this.props.week_products.product_request[0].random_shop.discount ? (
              <Countdown
                      date={
                        Date.now() + this.props.week_products.product_request[0].random_shop.discount
                          ? new Date(
                            this.props.week_products.product_request[0].random_shop.discount.until
                            ).getTime()
                          : null
                      }
                      daysInHours={true}
                      renderer={renderer}
                    />
                    ) : null}
           
            </div>
          </div>
        ) : null}
      </>
      // </div>
    );
  }
}
