import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";

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

  changeListOpened = (type) => {
    this.setState({
      lists_is_opened: {
        ...this.state.lists_is_opened,
        [type]: !this.state.lists_is_opened[type],
      },
    });
  };

  handleRouterPush = (e, href) => {
    e.preventDefault();
    document.body.className = "menu-is-closed";
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
              <a href="/">Главная</a>
            </li>
            <li
              onClick={() => this.changeListOpened("about")}
              className="menu-item-has-children"
            >
              {" "}
              <a href="#"> О Нас </a>
              <ul
                className={`list-unstyled ${
                  this.state.lists_is_opened.about
                    ? "dropdown_list_display_block"
                    : ""
                }`}
              >
                <li>
                  <a href="/about">История Завода</a>
                </li>
                <li>
                  <a href="/team">Руководство</a>
                </li>
                <li>
                  <a href="/services/1"> Технический Центр</a>
                </li>
              </ul>
            </li>
            <li
              onClick={() => this.changeListOpened("services")}
              className="menu-item-has-children"
            >
              {" "}
              <a href="#"> Сервисы</a>
              <ul
                className={`list-unstyled ${
                  this.state.lists_is_opened.services
                    ? "dropdown_list_display_block"
                    : ""
                }`}
              >
                <li>
                  {" "}
                  <a href="/services">Сервисы</a>
                </li>
                <li>
                  {" "}
                  <a href="/services/1">Детально Сервисы</a>
                </li>
              </ul>
            </li>
            <li
              onClick={() => this.changeListOpened("news")}
              className="menu-item-has-children"
            >
              {" "}
              <a href="#"> Новости </a>
              <ul
                className={`list-unstyled ${
                  this.state.lists_is_opened.news
                    ? "dropdown_list_display_block"
                    : ""
                }`}
              >
                <li>
                  {" "}
                  <a href="/news">Новости</a>
                </li>
                <li>
                  {" "}
                  <a href="/news/1">Детально Новости</a>
                </li>
              </ul>
            </li>
            <li
              onClick={() => this.changeListOpened("production")}
              className="menu-item-has-children"
            >
              {" "}
              <a href="#"> Продукция </a>
              <ul
                className={`list-unstyled ${
                  this.state.lists_is_opened.production
                    ? "dropdown_list_display_block"
                    : ""
                }`}
              >
                <li>
                  {" "}
                  <a href="/shop">Продукция</a>
                </li>
                <li>
                  {" "}
                  <a href="/product/1">Детально продукция</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/contacts">Контакты</a>
            </li>
          </ul>
          <ul className="list-unstyled social_links">
            <li>
              <a href="#" title="">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#" title="">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" title="">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#" title="">
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
