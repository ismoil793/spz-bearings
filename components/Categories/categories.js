import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/";
import Link from "next/link";
import onClickOutside from "react-onclickoutside";

class Foo extends React.Component {
  constructor(){
    super(); 
    this.state = { isMouse: false };
  }
  MouseEnter = () => {
    this.setState({
      isMouse: true
    });
    console.log(this.state.isMouse)
  }

  handleClickOutside = evt => {
    this.props.hide(false)
   };


  MouseLeave = () => {
    this.setState({
      isMouse: false
    });
    console.log(this.state.isMouse)
  }

  render(){
    return (
                <li
                      
                onMouseEnter={this.MouseEnter}
                onMouseLeave={this.MouseLeave}
              
                className={this.state.isMouse ? "nav-item hs-has-mega-menu u-header__nav-item hs-mega-menu-opened" : "nav-item hs-has-mega-menu u-header__nav-item"}
                data-event="hover"
                data-animation-in="slideInUp"
                data-animation-out="fadeOut"
                data-position="left"
              > 
                       <Link
                          href={{
                            pathname: "/shop/[id]",
                            query: { category_id: this.props.category.id }
                          }}
                          as={`/shop/${this.props.category.slug}`}
                        >
                          <a
                         
                            id="basicMegaMenu"
                            className="nav-link u-header__nav-link u-header__nav-link-toggle"
                            href="javascript:;"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {this.props.category.name}
                          </a>
                        </Link>
                        
                        <div
                          className="hs-mega-menu vmm-tfw u-header__sub-menu"
                          style={{}}
                         
                          aria-labelledby="basicMegaMenu"
                        >
                          <div className="vmm-bg">
                            <img
                              className="category-img"
                            />
                          </div>
                          <div className="row u-header__mega-menu-wrapper">
                            <div className="col mb-3 mb-sm-0">
                              <span className="u-header__sub-menu-title">
                                {this.props.category.name}
                              </span>
                              {typeof this.props.category.childs == "object" ? (
                                <ul className="u-header__sub-menu-nav-group mb-3">
                                  {this.props.category.childs.map((childcategory, k) => (
                                    <li  key={childcategory.id}>
                                      <Link
                                        href={{
                                          pathname: "/shop/[id]",
                                          query: {
                                            category_id: childcategory.id
                                          }
                                        }}
                                        as={`/shop/${childcategory.slug}`}
                                      >
                                        <a
                                          className="nav-link u-header__sub-menu-nav-link"
                                          href="#"
                                        >
                                          {childcategory.name}
                                        </a>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          </div>
                        </div>
  </li>
  )
  
  }
}

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

const mapStateToProps = state => ({
  productCategories: state.productCategories.rawProductCategories
});

const mapDispatchToProps = dispatch => ({
  resetProductCategory: () => dispatch(actions.resetBreadCrumb()),
  fetchSetProductCategories: () => dispatch(actions.fetchSetProductCategories())
});

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
   
    };
  }
  showSettings(event) {
    event.preventDefault();
  }

  async componentDidMount() {
    const { productCategories, fetchSetProductCategories } = this.props;
    if (!productCategories.length) {
      fetchSetProductCategories();
    }
  }

  componentWillUnmount() {
    this.props.resetProductCategory();
  }

 
  render() {
    const { productCategories } = this.props;

    return (
      <>
        <div
          id="basicsCollapseOne"
          className="collapse show vertical-menu"
          aria-labelledby="basicsHeadingOne"
          data-parent="#basicsAccordion"
        >
          <div className="card-body p-0">
            <nav className="js-mega-menu navbar navbar-expand-xl u-header__navbar u-header__navbar--no-space hs-menu-initialized">
              <div
                id="navBar"
                className="collapse navbar-collapse u-header__navbar-collapse"
              >
                {productCategories && productCategories.length > 0 ? (
                  <ul className="navbar-nav u-header__navbar-nav">
                    {productCategories.map(category => (
                    <Foo category={category}  />
                    ))}
                  </ul>
                ) : null}
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(Category);
