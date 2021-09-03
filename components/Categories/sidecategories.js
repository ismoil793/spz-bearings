import React from "react";
import axios from "axios";
import Link from "next/link";
import url from "../url";
import onClickOut from "react-onclickoutside";
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

 class AsideCategory extends React.Component {
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
      <>
        <aside
          id="sidebarHeader1"
          className="u-sidebar u-sidebar--left"
          aria-labelledby="sidebarHeaderInvoker"
        >
          <div className="u-sidebar__scroller">
            <div className="u-sidebar__container">
              <div className="u-header-sidebar__footer-offset">
                <div className="position-absolute top-0 right-0 z-index-2 pt-4 pr-4 bg-white">
                  <button
                  onClick={this.handleClickOutside}
                    type="button"
                    className="close ml-auto"
                    aria-controls="sidebarHeader"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-unfold-event="click"
                    data-unfold-hide-on-scroll="false"
                    data-unfold-target="#sidebarHeader1"
                    data-unfold-type="css-animation"
                    data-unfold-animation-in="fadeInLeft"
                    data-unfold-animation-out="fadeOutLeft"
                    data-unfold-duration="500"
                  >
                    <span aria-hidden="true">
                      <i className="ec ec-close-remove text-gray-90 font-size-20"></i>
                    </span>
                  </button>
                </div>

                <div className="js-scrollbar u-sidebar__body">
                  <div
                    id="headerSidebarContent"
                    className="u-sidebar__content u-header-sidebar__content"
                  >
                    <a
                      className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center mb-3"
                      href="index.html"
                      aria-label="Electro"
                    >
                      <img src="/static/assets/img/75X75/logo.png" />
                    </a>

                    {this.state.productCategories ? (
                      <ul
                        id="headerSidebarList"
                        className="u-header-collapse__nav"
                      >
                        {this.state.productCategories.map(category => (
                        <AsideChild category={category}/>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
{/* 
              <footer
                id="SVGwaveWithDots"
                className=" u-header-sidebar__footer"
              >
                <ul className="list-inline mb-0">
                  <li className="list-inline-item pr-3">
                    <a
                      className="u-header-sidebar__footer-link text-gray-90"
                      href="#"
                    >
                      Политика конфиденциальности{" "}
                    </a>
                  </li>
                  <li className="list-inline-item pr-3">
                    <a
                      className="u-header-sidebar__footer-link text-gray-90"
                      href="#"
                    >
                      Условия соглащения
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="u-header-sidebar__footer-link text-gray-90"
                      href="#"
                    >
                      <i className="fas fa-info-circle"></i>
                    </a>
                  </li>
                </ul>

                <div className="position-absolute right-0 bottom-0 left-0 z-index-n1">
                  <img
                    className="js-svg-injector"
                    src="/static/assets/svg/components/wave-bottom-with-dots.svg"
                    alt="Image Description"
                    data-parent="#SVGwaveWithDots"
                  />
                </div>
              </footer> */}
            </div>
          </div>
        </aside>
      </>
    );
  }
}
export default onClickOut(AsideCategory);