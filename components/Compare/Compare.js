import React from "react";
import axios from "axios";
import "../../plugins/axios";
import Cookies from "universal-cookie";
import Slider from "react-slick";
import DeleteButtonCompare from "./DeleteButton";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import url from "../url";
import CompareButton from "../Buttons/compareCart";
import DeleteCompare from "../Buttons/compareDelete";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="js-compare-slider-right compare__slider-nav compare__slider-nav--right"
    >
      <i className="fas fa-arrow-right"></i>
    </button>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="js-compare-slider-left compare__slider-nav compare__slider-nav--left"
    >
      <i className="fas fa-arrow-left"></i>
    </button>
  );
}

export default class Compare extends React.Component {
  constructor() {
    super();

    this.state = {
      classes: [],
      features: [],
      products: [],
      classID: null,
      isLoading: true
    };
  }

  UpdateCompare = () => {
    const cookies = new Cookies();
    axios
    .get(`${url}/api/comparison/features`, {
      params: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        class_id: this.state.classID
      }
    })
    .then(response => {
      this.setState({
        features: response.data.data.features,
        products: response.data.data.products
      });
    })
    .catch(error => {
      console.log(error);
    });


    axios
      .get(`${url}/api/comparison/classes`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        this.setState({
          classes: response.data.data.classes,
          classID: response.data.data.classes[0].id
        },() => {
          axios
    .get(`${url}/api/comparison/features`, {
      params: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        class_id: this.state.classID
      }
    })
    .then(response => {
      this.setState({
        features: response.data.data.features,
        products: response.data.data.products
      });
    })
    .catch(error => {
      console.log(error);
    });
        });

       
      })
      .catch(error => {
        console.log(error);
      });


     
  };

  componentDidMount() {
    const cookies = new Cookies();
    axios
      .get(`${url}/api/comparison/classes`, {
        params: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type")
        }
      })
      .then(response => {
        this.setState(
          {
            classes: response.data.data.classes,
            classID: response.data.data.classes[0].id
          },
          () => {
            axios
              .get(`${url}/api/comparison/features`, {
                params: {
                  device_token: cookies.get("device_token"),
                  device_type: cookies.get("device_type"),
                  class_id: this.state.classID
                }
              })
              .then(response => {
                this.setState({
                  features: response.data.data.features,
                  products: response.data.data.products,
                  isLoading: false
                });
              })
              .catch(error => {
                console.log(error);
                this.setState({
                  isLoading: false
                });
              });
          }
        );
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false
        });
      });
  }

  handleChange = e => {
    const cookies = new Cookies();
    this.setState({ [e.target.name]: e.target.value });

    setTimeout(() => {
      axios
        .get(`${url}/api/comparison/features`, {
          params: {
            device_token: cookies.get("device_token"),
            device_type: cookies.get("device_type"),
            class_id: this.state.classID
          }
        })
        .then(response => {
          this.setState({
            features: response.data.data.features,
            products: response.data.data.products
          });
        })
        .catch(error => {
          console.log(error);
        });
    }, 10);
  };

  render() {
    let classID;

    if (!this.state.classID) {
      classID = "";
    } else {
      classID = this.state.classID;
    }
    const { classes, features, products } = this.state;
    var count = products.length;
    var sliderCount = 3;
    if (count == 1) {
      sliderCount = 1;
    } else if (count == 2) {
      sliderCount = 2;
    }

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: sliderCount,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
    };



    return (
      <>
      {this.state.isLoading ? (
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={100}
              color={"red"}
              loading={this.state.isLoading}
            />
          ) : (
      <main id="content" role="main">
      <div className="container">
          <div className="table-responsive table-bordered table-compare-list mb-10 border-0">
              <table className="table">
                  <tbody>
                      <tr>
                          <th className="min-width-200">Выберите класс для сравнений 
                          <br />
                          <select
                            onChange={this.handleChange}
                            value={classID}
                            name="classID"
                            className="js-select selectpicker dropdown-select pointer max-width-200 max-width-160-sm right-dropdown-0 px-2 px-xl-0 btn-sm bg-white font-weight-normal py-2 border text-gray-20 bg-lg-down-transparent border-lg-down-0"
                          >
                            {classes
                              ? classes.map(data => (
                                  <option key={data.id} value={data.id}>
                                    {data.name}
                                  </option>
                                ))
                              : null}
                          </select>
                          </th>
                          {products
                        ? products.map(product => (
                          <td>
                              <a href="#" className="product d-block">
                                  <div className="product-compare-image">
                                      <div className="d-flex mb-3"> 
                                          <img className="img-fluid mx-auto" src={product.images ? product.images[0].types.medium_default : null} alt="Image Description"/>
                                      </div>
                                  </div>
                                  <h3 className="product-item__title text-blue font-weight-bold mb-3">{product.name}</h3>
                              </a>
                          
                          </td>)): null}
                      
                      </tr>

                      <tr>
                          <th>Цена</th>
                          {products
                        ? products.map(product => (
                          
                          <td>
                              <div className="product-price">{product.random_shop.discount ? product.random_shop.discount.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : product.random_shop.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум</div>
                          </td>
                         )) :null}
                      </tr>

                    
                    
                     

                      <tr>
                          <th>Добавить в корзину</th>
                          {products
                        ? products.map(product => (
                          
                          <td>
                          <CompareButton item_shop_id={product.random_shop.item_shop_id} />
                        </td> )) : null}
                         
                      </tr>
                    
                  
                      <tr>
                          <th>Вес</th>
                          {products
                        ? products.map(product => (
                          <td>{product.weight}</td>)) :
                          null}
                          
                      </tr>
                       {features
                        ? features.map(featureName => (
                      <tr>

                          <th>{featureName.name}</th>
                          {featureName.values && featureName.values.length > 0 ? fefeatureName.values.map(value =>(
                          <td>{value.value}</td>
                          )) : null }
                          
                      </tr>
                        )):null}
                     
                    

                      <tr>
                          <th>Удалить</th>
                          {products
                        ? products.map(product => (
                          <td className="text-center">
                             <DeleteCompare  
                             onDelete={this.UpdateCompare}
                                  ID={product.id} />
                        </td> )): null}
                         
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </main>)}

       </>
      
      //   {this.state.isLoading ? (
      //     <ClipLoader
      //       css={override}
      //       sizeUnit={"px"}
      //       size={100}
      //       color={"red"}
      //       loading={this.state.isLoading}
      //     />
      //   ) : this.state.products && this.state.products.length ? (
      //     <section className="compare bg-white">
      //       <div className="container">
      //         <div className="relative">
      //           <h1 className="title title--lg p-b-15 text-upper display-inline-block">
      //             Список сравнения
      //           </h1>
      //         </div>

      //         <div className="blocks-shadow">
      //           <div className="compare__row">
      //             <div className="col-md-3 compare__block compare__block-x">
      //               <div data-mh="row-0">
      //                 <div className="compare__ltb">
      //                   <h2 className="title title--sm p-b-15">
      //                     Сравнение для категорий
      //                   </h2>

      //                   <div className="form-group">
      //                     <select
      //                       onChange={this.handleChange}
      //                       value={classID}
      //                       name="classID"
      //                       className="select"
      //                     >
      //                       {classes
      //                         ? classes.map(data => (
      //                             <option key={data.id} value={data.id}>
      //                               {data.name}
      //                             </option>
      //                           ))
      //                         : null}
      //                     </select>
      //                   </div>

      //                   <h6>
      //                     Выберите категорию чтобы сравнить добавленный товар
      //                   </h6>
      //                 </div>
      //                 <div className="compare__space"></div>
      //               </div>

      //               <div className="compare__lbb">
      //                 {features
      //                   ? features.map(featureName => (
      //                       <div
      //                         key={featureName.id}
      //                         className="compare__row-inner"
      //                         data-mh="row-3"
      //                       >
      //                         <div className="compare_div">
      //                           <p
      //                             style={{ fontWeight: "900" }}
      //                             className="compare__row-info"
      //                           >
      //                             {featureName.name}
      //                           </p>
      //                         </div>
      //                       </div>
      //                     ))
      //                   : null}
      //               </div>
      //             </div>

      //             <div className="js-compare-slider">
      //               <Slider {...settings}>
      //                 {products
      //                   ? products.map((product, index) => (
      //                       <div
      //                         key={index}
      //                         className="col-md-12 compare__block"
      //                       >
      //                         <div
      //                           className="js-clone-block compare__rtb"
      //                           data-mh="row-0"
      //                         >
      //                           <DeleteButtonCompare
      //                             onDelete={this.UpdateCompare}
      //                             ID={product.id}
      //                           />

      //                           <div className="compare__imgwrap">
      //                             <a href="">
      //                               <img
      //                                 src={product.images[0].types.home_default}
      //                                 className="compare__img"
      //                                 alt={product.name}                                    />
      //                             </a>
      //                           </div>

      //                           <div className="compare__infowrap relative">
                              
      //                             <a href="">
      //                               <p className="compare__name">
      //                                 {product.name}
      //                               </p>
      //                             </a>

      //                             <div className="display-inline-block">
      //                               <p className="compare__strikedprice"></p>
      //                               <p className="compare__price">
      //                                 {product.random_shop.price
      //                                   .toString()
      //                                   .replace(
      //                                     /\B(?=(\d{3})+(?!\d))/g,
      //                                     " "
      //                                   )}{" "}
      //                                 сум
      //                               </p>
      //                             </div>

      //                             <div className="clearfix"></div>
      //                           </div>
      //                         </div>

      //                         {features
      //                           ? features.map((feature, i) => (
      //                               <div key={i} className="compare__rbb">
      //                                 <div className="compare__row-inner">
      //                                   <div className="compare_div">
      //                                     <p className="compare__row-info">
      //                                       {feature.values[index].value
      //                                         ? feature.values[index].value
      //                                         : "-"}
      //                                     </p>
      //                                   </div>
      //                                 </div>
      //                               </div>
      //                             ))
      //                           : null}
      //                       </div>
      //                     ))
      //                   : null}
      //               </Slider>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </section>
      //   ) : (
      //     <section className="compare bg-white">
      //       <div className="container">
      //         <img
      //           style={{ width: "100%" }}
      //           src="/static/assets/template/avtech/images/cartoons/4.png"
      //           alt="No products"
      //         />
      //       </div>
      //     </section>

          
      //   )}
      // </>
    );
  }
}
