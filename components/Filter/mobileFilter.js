

import React from "react";
import axios from "axios";
import Link from "next/link";
import url from "../url";
import onClickOutside from "react-onclickoutside";
import AsideChild from "./subchild";

const PostLink = props => (
  <Link
    href={{
      pathname: "/shop/[id]",
      query: { category_id: props.id }
    }}
    as={`/shop/${props.slug}`}
  >
    <a>
      {props.name}
      <i className="fas fa-chevron-right"> </i>{" "}
    </a>
  </Link>
);

 class MobileFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCategories: [],
      isChild: false
    };
  }

  componentDidMount() {
    axios
      .get(`${url}/api/categories`, {
        params: {
          type: "recursive"
        }
      })
      .then(response => {
        this.setState({
          productCategories: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClickOutside = evt => {
    this.props.hide(false)
   };

  render() {
  
    return (
        <aside id="sidebarContent1" className="u-sidebar u-sidebar--left" aria-labelledby="sidebarNavToggler1">
        <div className="u-sidebar__scroller">
            <div className="u-sidebar__container">
                <div className="">
                  
                    <div className="d-flex align-items-center pt-3 px-4 bg-white">
                        <button type="button" className="close ml-auto"
                            aria-controls="sidebarContent1"
                            aria-haspopup="true"
                            aria-expanded="false"
                            data-unfold-event="click"
                            data-unfold-hide-on-scroll="false"
                            data-unfold-target="#sidebarContent1"
                            data-unfold-type="css-animation"
                            data-unfold-animation-in="fadeInLeft"
                            data-unfold-animation-out="fadeOutLeft"
                            data-unfold-duration="500">
                            <span aria-hidden="true"><i className="ec ec-close-remove"></i></span>
                        </button>
                    </div>
               
                    <div className="js-scrollbar u-sidebar__body">
                        <div className="u-sidebar__content u-header-sidebar__content px-4">
                            <div className="mb-6 border border-width-2 border-color-3 borders-radius-6">
                               
                                <ul id="sidebarNav" className="list-unstyled mb-0 sidebar-navbar view-all">
                                    <li><div className="dropdown-title">Browse Categories</div></li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav1Collapse" data-target="#sidebarNav1Collapse">
                                            Accessories<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav1Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav1" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Accessories<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Cameras & Photography<span className="text-gray-25 font-size-12 font-weight-normal"> (11)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Computer Components<span className="text-gray-25 font-size-12 font-weight-normal"> (22)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Gadgets<span className="text-gray-25 font-size-12 font-weight-normal"> (5)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Home Entertainment<span className="text-gray-25 font-size-12 font-weight-normal"> (7)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Laptops & Computers<span className="text-gray-25 font-size-12 font-weight-normal"> (42)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Printers & Ink<span className="text-gray-25 font-size-12 font-weight-normal"> (63)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Smart Phones & Tablets<span className="text-gray-25 font-size-12 font-weight-normal"> (11)</span></a></li>
                                                <li><a className="dropdown-item" href="#">TV & Audio<span className="text-gray-25 font-size-12 font-weight-normal"> (66)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Video Games & Consoles<span className="text-gray-25 font-size-12 font-weight-normal"> (31)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav2Collapse" data-target="#sidebarNav2Collapse">
                                            Cameras & Photography<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav2Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav2" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Cameras<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav3Collapse" data-target="#sidebarNav3Collapse">
                                            Computer Components<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav3Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav3" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Computer Cases<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav4Collapse" data-target="#sidebarNav4Collapse">
                                            Gadgets<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav4Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav4" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Smartwatches<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Wearables<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav5Collapse" data-target="#sidebarNav5Collapse">
                                            Home Entertainment<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav5Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav5" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Tvs<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav6Collapse" data-target="#sidebarNav6Collapse">
                                            Laptops & Computers<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav6Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav6" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Accessories<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Cameras & Photography<span className="text-gray-25 font-size-12 font-weight-normal"> (11)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Computer Components<span className="text-gray-25 font-size-12 font-weight-normal"> (22)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Gadgets<span className="text-gray-25 font-size-12 font-weight-normal"> (5)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Home Entertainment<span className="text-gray-25 font-size-12 font-weight-normal"> (7)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Laptops & Computers<span className="text-gray-25 font-size-12 font-weight-normal"> (42)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Printers & Ink<span className="text-gray-25 font-size-12 font-weight-normal"> (63)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Smart Phones & Tablets<span className="text-gray-25 font-size-12 font-weight-normal"> (11)</span></a></li>
                                                <li><a className="dropdown-item" href="#">TV & Audio<span className="text-gray-25 font-size-12 font-weight-normal"> (66)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Video Games & Consoles<span className="text-gray-25 font-size-12 font-weight-normal"> (31)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav7Collapse" data-target="#sidebarNav7Collapse">
                                            Printers & Ink<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav7Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav7" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Printers<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav8Collapse" data-target="#sidebarNav8Collapse">
                                            Smart Phones & Tablets<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav8Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav8" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Smartphones<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                                <li><a className="dropdown-item" href="#">Tablets<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav9Collapse" data-target="#sidebarNav9Collapse">
                                            TV & Audio<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav9Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav9" className="list-unstyled dropdown-list">
                                          
                                                <li><a className="dropdown-item" href="#">Audio Speakers<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                              
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle dropdown-toggle-collapse" href="javascript:;" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sidebarNav10Collapse" data-target="#sidebarNav10Collapse">
                                            Video Games & Consoles<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                        </a>
        
                                        <div id="sidebarNav10Collapse" className="collapse" data-parent="#sidebarNav">
                                            <ul id="sidebarNav10" className="list-unstyled dropdown-list">
                                              
                                                <li><a className="dropdown-item" href="#">Game Consoles<span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></a></li>
                                                
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                       
                            </div>
                            <div className="mb-6">
                                <div className="border-bottom border-color-1 mb-5">
                                    <h3 className="section-title section-title__sm mb-0 pb-2 font-size-18">Filters</h3>
                                </div>
                                <div className="border-bottom pb-4 mb-4">
                                    <h4 className="font-size-14 mb-3 font-weight-bold">Brands</h4>
        
                                  
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="brandAdidas"/>
                                            <label className="custom-control-label" for="brandAdidas">Adidas
                                                <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="brandNewBalance"/>
                                            <label className="custom-control-label" for="brandNewBalance">New Balance
                                                <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="brandNike"/>
                                            <label className="custom-control-label" for="brandNike">Nike
                                                <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="brandFredPerry"/>
                                            <label className="custom-control-label" for="brandFredPerry">Fred Perry
                                                <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="brandTnf"/>
                                            <label className="custom-control-label" for="brandTnf">The North Face
                                                <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                            </label>
                                        </div>
                                    </div>
                                
                                    <div className="collapse" id="collapseBrand">
                                        <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="brandGucci"/>
                                                <label className="custom-control-label" for="brandGucci">Gucci
                                                    <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="brandMango"/>
                                                <label className="custom-control-label" for="brandMango">Mango
                                                    <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <a className="link link-collapse small font-size-13 text-gray-27 d-inline-flex mt-2" data-toggle="collapse" href="#collapseBrand" role="button" aria-expanded="false" aria-controls="collapseBrand">
                                        <span className="link__icon text-gray-27 bg-white">
                                            <span className="link__icon-inner">+</span>
                                        </span>
                                        <span className="link-collapse__default">Show more</span>
                                        <span className="link-collapse__active">Show less</span>
                                    </a>
                                  
                                </div>
                                <div className="border-bottom pb-4 mb-4">
                                    <h4 className="font-size-14 mb-3 font-weight-bold">Color</h4>
        
                               
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="categoryTshirt"/>
                                            <label className="custom-control-label" for="categoryTshirt">Black <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="categoryShoes"/>
                                            <label className="custom-control-label" for="categoryShoes">Black Leather <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="categoryAccessories"/>
                                            <label className="custom-control-label" for="categoryAccessories">Black with Red <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="categoryTops"/>
                                            <label className="custom-control-label" for="categoryTops">Gold <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="categoryBottom"/>
                                            <label className="custom-control-label" for="categoryBottom">Spacegrey <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                        </div>
                                    </div>
                            
                                    <div className="collapse" id="collapseColor">
                                        <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="categoryShorts"/>
                                                <label className="custom-control-label" for="categoryShorts">Turquoise <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="categoryHats"/>
                                                <label className="custom-control-label" for="categoryHats">White <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex align-items-center justify-content-between mb-2 pb-1">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="categorySocks"/>
                                                <label className="custom-control-label" for="categorySocks">White with Gold <span className="text-gray-25 font-size-12 font-weight-normal"> (56)</span></label>
                                            </div>
                                        </div>
                                    </div>
                                   
                                
                                    <a className="link link-collapse small font-size-13 text-gray-27 d-inline-flex mt-2" data-toggle="collapse" href="#collapseColor" role="button" aria-expanded="false" aria-controls="collapseColor">
                                        <span className="link__icon text-gray-27 bg-white">
                                            <span className="link__icon-inner">+</span>
                                        </span>
                                        <span className="link-collapse__default">Show more</span>
                                        <span className="link-collapse__active">Show less</span>
                                    </a>
                                  
                                </div>
                                <div className="range-slider">
                                    <h4 className="font-size-14 mb-3 font-weight-bold">Price</h4>
                                  
                                    <input className="js-range-slider" type="text"
                                    data-extra-classes="u-range-slider u-range-slider-indicator u-range-slider-grid"
                                    data-type="double"
                                    data-grid="false"
                                    data-hide-from-to="true"
                                    data-prefix="$"
                                    data-min="0"
                                    data-max="3456"
                                    data-from="0"
                                    data-to="3456"
                                    data-result-min="#rangeSliderExample3MinResult"
                                    data-result-max="#rangeSliderExample3MaxResult"/>
                                  
                                    <div className="mt-1 text-gray-111 d-flex mb-4">
                                        <span className="mr-0dot5">Price: </span>
                                        <span>$</span>
                                        <span id="rangeSliderExample3MinResult" className=""></span>
                                        <span className="mx-0dot5"> — </span>
                                        <span>$</span>
                                        <span id="rangeSliderExample3MaxResult" className=""></span>
                                    </div>
                                    <button type="submit" className="btn px-4 btn-primary-dark-w py-2 rounded-lg">Filter</button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <div className="border-bottom border-color-1 mb-5">
                                    <h3 className="section-title section-title__sm mb-0 pb-2 font-size-18">Latest Products</h3>
                                </div>
                                <ul className="list-unstyled">
                                    <li className="mb-4">
                                        <div className="row">
                                            <div className="col-auto">
                                                <a href="single-product-fullwidth.html" className="d-block width-75">
                                                    <img className="img-fluid" src="../../assets/img/300X300/img1.jpg" alt="Image Description"/>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <h3 className="text-lh-1dot2 font-size-14 mb-0"><a href="single-product-fullwidth.html">Notebook Black Spire V Nitro VN7-591G</a></h3>
                                                <div className="text-warning text-ls-n2 font-size-16 mb-1" style="width: 80px;">
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="far fa-star text-muted"></small>
                                                </div>
                                                <div className="font-weight-bold">
                                                    <del className="font-size-11 text-gray-9 d-block">$2299.00</del>
                                                    <ins className="font-size-15 text-red text-decoration-none d-block">$1999.00</ins>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="row">
                                            <div className="col-auto">
                                                <a href="single-product-fullwidth.html" className="d-block width-75">
                                                    <img className="img-fluid" src="../../assets/img/300X300/img3.jpg" alt="Image Description"/>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <h3 className="text-lh-1dot2 font-size-14 mb-0"><a href="single-product-fullwidth.html">Notebook Black Spire V Nitro VN7-591G</a></h3>
                                                <div className="text-warning text-ls-n2 font-size-16 mb-1" style="width: 80px;">
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="far fa-star text-muted"></small>
                                                </div>
                                                <div className="font-weight-bold font-size-15">
                                                    $499.00
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="row">
                                            <div className="col-auto">
                                                <a href="single-product-fullwidth.html" className="d-block width-75">
                                                    <img className="img-fluid" src="../../assets/img/300X300/img5.jpg" alt="Image Description"/>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <h3 className="text-lh-1dot2 font-size-14 mb-0"><a href="single-product-fullwidth.html">Tablet Thin EliteBook Revolve 810 G6</a></h3>
                                                <div className="text-warning text-ls-n2 font-size-16 mb-1" style="width: 80px;">
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="far fa-star text-muted"></small>
                                                </div>
                                                <div className="font-weight-bold font-size-15">
                                                    $100.00
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="row">
                                            <div className="col-auto">
                                                <a href="single-product-fullwidth.html" className="d-block width-75">
                                                    <img className="img-fluid" src="../../assets/img/300X300/img6.jpg" alt="Image Description"/>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <h3 className="text-lh-1dot2 font-size-14 mb-0"><a href="single-product-fullwidth.html">Notebook Purple G952VX-T7008T</a></h3>
                                                <div className="text-warning text-ls-n2 font-size-16 mb-1" style="width: 80px;">
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="far fa-star text-muted"></small>
                                                </div>
                                                <div className="font-weight-bold">
                                                    <del className="font-size-11 text-gray-9 d-block">$2299.00</del>
                                                    <ins className="font-size-15 text-red text-decoration-none d-block">$1999.00</ins>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="mb-4">
                                        <div className="row">
                                            <div className="col-auto">
                                                <a href="single-product-fullwidth.html" className="d-block width-75">
                                                    <img className="img-fluid" src="../../assets/img/300X300/img10.png" alt="Image Description"/>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <h3 className="text-lh-1dot2 font-size-14 mb-0"><a href="single-product-fullwidth.html">Laptop Yoga 21 80JH0035GE W8.1</a></h3>
                                                <div className="text-warning text-ls-n2 font-size-16 mb-1" style="width: 80px;">
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="fas fa-star"></small>
                                                    <small className="far fa-star text-muted"></small>
                                                </div>
                                                <div className="font-weight-bold font-size-15">
                                                    $1200.00
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
               
                </div>
            </div>
        </div>
        </aside>
        
        
    );
  }
}
export default onClickOutside(MobileFilter);