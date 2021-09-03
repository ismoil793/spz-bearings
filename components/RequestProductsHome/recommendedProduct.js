import React from "react";
import Slider from "react-slick";
import FavouriteButton from "../Favourites/Add_favourites_button";
import CompareButton from "../Compare/CompareButton";
import CartButton from "../Buttons/cartButton";
import Link from "next/link";

const ProductLink = props => (
  <>
    <Link
      href={{
        pathname: "/productPage/[productCard]"
       
      }}
      as={`/productPage/${props.slug}`}
    >
      <div className="viewed_item discount d-flex flex-column align-items-center justify-content-center text-center">
        <div className="viewed_image">
          <img src={props.image} alt={props.slug} />
        </div>
        <div className="viewed_content text-center">
        { props.quantity ? (
                    <div className="product_price">{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</div>   
                   ): <div className="product_price">Нет в наличии</div>  }
        
          <div className="viewed_name">
            <a >{props.id}</a>
          </div>
        </div>
        {props.discount_price ? (
        <ul className="item_marks">
          <li className="item_mark item_discount">-25%</li>
          <li className="item_mark item_new">new</li>
        </ul>
        ) : (
          <ul className="item_marks">
          <li className="item_mark item_discount">Best</li>
          <li className="item_mark item_new">new</li>
        </ul>
        )}
      </div>
    </Link>
  </>
);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className="js-next position-absolute top-0 font-size-17 u-slick__arrow-normal top-0 fa fa-angle-right right-0 slick-arrow">
    
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className="js-prev position-absolute top-0 font-size-17 u-slick__arrow-normal top-0 fa fa-angle-left right-1 slick-arrow">
    
    </div>
  );
}

export default class RecommendedProducts extends React.Component {
 


  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
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
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };
   
    return (
      <div className="js-slick-carousel position-static overflow-hidden u-slick-overflow-visble pb-7 pt-2 px-1"
            >     
      <Slider {...settings}>
        {this.props.recommended
          ? this.props.recommended.product_request.map(pop => (
            
             <div className="js-slide products-group" key={pop.id}>
                 <div className="product-item">
                     <div className="product-item__outer h-100">
                         <div className="product-item__inner px-wd-4 p-2 p-md-3">
                             <div className="product-item__body pb-xl-2">
                             <Link
                              href={{
                                pathname: "/product/[product]"
                              }}
                              as={`/product/${pop.slug}`}
                              >
                                <div>
                                  <div className="mb-2"><a  className="font-size-12 text-gray-5">{pop.country ?  pop.country.name : ''}</a></div>
                                    <h5 className="mb-1 product-item__title"><a  className="text-blue font-weight-bold">{pop.name}</a></h5>
                                    <div className="mb-2">
                                      <a  className="d-block text-center"><img className="img-fluid" src={pop.images[0].types.medium_default} alt="Image Description"/></a>
                                    </div>
                                 </div>    
                                 </Link>
                                 <div className="flex-center-between mb-1">
                                     <div className="prodcut-price">
                                         <div className="text-gray-100">{pop.random_shop.price.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</div>
                      <div className="no-nds">
                                  Без учета НДС
                                 </div>
                                     </div>
                                     <CartButton item_shop_id={pop.random_shop.item_shop_id} product_name={pop.name}/>
                              
                                 </div>
                             </div>
                             <div className="product-item__footer">
                                 <div className="border-top pt-2 flex-center-between flex-wrap">
                                 <CompareButton product_name={pop.name} product_id={pop.id} />
                                    <FavouriteButton product_name={pop.name} product_id={pop.id} /> 
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        
        
          
            ))
          : null}
      </Slider>
      </div>
    );
  }
}
