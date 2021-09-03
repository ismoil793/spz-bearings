import React from "react";
import Slider from "react-slick";
import axios from "axios";
import Link from "next/link";
import url from "../url";

const PopularLink = props => (
  <Link
    href={{
      pathname: "/shop/[id]"
    }}
    as={`/shop/${props.slug}`}
  >
    <div className="popular_category d-flex flex-column align-items-center justify-content-center">
      <div className="popular_category_image">
        <img style={{ width: "70%" }} src={props.image} alt={props.id} />
      </div>
      <div className="popular_category_text" style={{ color: "#000000" }}>
        {" "}
        <a href="#">{props.id}</a>
      </div>
    </div>
  </Link>
);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (

    <div
      onClick={onClick}
      className="popular_categories_next popular_categories_nav"
    >
      <i className="fas fa-angle-right ml-auto"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
 

    <div
      onClick={onClick}
      className="popular_categories_prev popular_categories_nav"
    >
      <i className="fas fa-angle-left ml-auto"></i>
    </div>
  );
}

export default class PopularCategories extends React.Component {
 
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
    };

    return (
      <Slider {...settings}>
        {this.props.popular_categories
          ? this.props.popular_categories.categories.map(pop => (
              <div key={pop.id} className="owl-item">
                <PopularLink slug={pop.slug} id={pop.name} image={pop.wicon} />
              </div>
            ))
          : null}
      </Slider>
    );
  }
}
