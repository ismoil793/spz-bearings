import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import HeaderText from "../../../static/locales/header";

class OverlayComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      lists_is_opened: {
        about: false,
        services: false,
        news: false,
        production: false,
      },
    };
  }

  componentDidMount() {
    console.log('mount overlay')
  }

  changeListOpened = (type) => {
    this.setState({
      lists_is_opened: {
        ...this.state.lists_is_opened,
        [type]: !this.state.lists_is_opened[type],
      },
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      document.body.className = "menu-is-closed";
    }
  }

  handleRouterPush = (e, href) => {
    e.preventDefault();
    this.props.router.push({
      pathname: `${href.url}`,
      query: { [href.as]: href.url.description },
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <>
        <div className="mobile_menu d-flex flex-wrap align-items-end">
          <div
            onClick={() => (document.body.className = "menu-is-closed")}
            className="close_btn"
          >
            X
          </div>
          <ul className="list-unstyled mb_menu wd_scroll">
            <li>
              <Link href="/" locale={this.props.locale}>
              <a>
                {HeaderText[this.props.locale].nav[0]}
              </a>
              </Link>
            </li>
            <li
              onClick={() => this.changeListOpened("about")}
              className="menu-item-has-children"
            >
              {" "}
              <Link locale={this.props.locale} href="#">
              <a >
                {" "}
                {HeaderText[this.props.locale].nav[1].dropdown}{" "}
              </a>
              </Link>
              <ul
                className={`list-unstyled ${
                  this.state.lists_is_opened.about
                    ? "dropdown_list_display_block"
                    : ""
                }`}
              >
                <li>
                  <Link locale={this.props.locale} href="/about">
                  <a>
                    {HeaderText[this.props.locale].nav[1].elements[0]}
                  </a>
                  </Link>
                </li>
                {/*<li>*/}
                {/*  <Link locale={this.props.locale} href="/team">*/}
                {/*  <a>*/}
                {/*    {HeaderText[this.props.locale].nav[1].elements[1]}*/}
                {/*  </a>*/}
                {/*  </Link>*/}
                {/*</li>*/}
                <li>
                  <Link locale={this.props.locale} href="/services/1">
                  <a>
                    {HeaderText[this.props.locale].nav[1].elements[2]}
                  </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li onClick={() => this.changeListOpened("services")}>
              {" "}
              <Link locale={this.props.locale} href="/services">
              <a>
                {" "}
                {HeaderText[this.props.locale].nav[2]}
              </a>
              </Link>
            </li>
            <li onClick={() => this.changeListOpened("news")}>
              {" "}
              <Link locale={this.props.locale} href="/news">
              <a >
                {" "}
                {HeaderText[this.props.locale].nav[3]}{" "}
              </a>
              </Link>
            </li>
            <li onClick={() => this.changeListOpened("production")}>
              {" "}
              <Link locale={this.props.locale} href="/shop">
              <a>
                {" "}
                {HeaderText[this.props.locale].nav[4]}{" "}
              </a>
              </Link>
            </li>
            <li>
              <Link locale={this.props.locale} href="/contacts">
              <a>
                {HeaderText[this.props.locale].nav[5]}
              </a>
              </Link>
            </li>
          </ul>
          <ul className="list-unstyled social_links">
            <li>
              <a locale={this.props.locale} href="#" title="">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a locale={this.props.locale} href="#" title="">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a locale={this.props.locale} href="#" title="">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a locale={this.props.locale} href="#" title="">
                <i className="fab fa-dribbble"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="body_capture"></div>
      </>
    );
  }
}

export default withRouter(OverlayComponent);
