import React from "react";
import Link from "next/link";

class OverlayComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      lists_is_opened: {
        about: false,
        services: false,
        news: false,
        production: false
      }
    };
  }

  changeListOpened = (type) => {
    this.setState({
      lists_is_opened: {
        ...this.state.lists_is_opened, [type]: !this.state.lists_is_opened[type]
      }
    })
  }

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
              <a href="index.html">Главная</a>
            </li>
            <li onClick={()=>this.changeListOpened('about')} className="menu-item-has-children">
              {" "}
              <a href="#"> О Нас </a>
              <ul className={`list-unstyled ${this.state.lists_is_opened.about ? 'dropdown_list_display_block' : ''}`}>
                <li>
                  <a href="/about">История Завода</a>
                </li>
                <li>
                  <a href="team.html">Руководство</a>
                </li>
                <li>
                  <a href="service-details.html">Технический Центр</a>
                </li>
              </ul>
            </li>
            <li onClick={()=>this.changeListOpened('services')} className="menu-item-has-children">
              {" "}
              <a href="#"> Сервисы</a>
              <ul className={`list-unstyled ${this.state.lists_is_opened.services ? 'dropdown_list_display_block' : ''}`}>
                <li>
                  {" "}
                  <a href="services.html">Сервисы</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="service-details.html">Детально Сервисы</a>{" "}
                </li>
              </ul>
            </li>
            <li onClick={()=>this.changeListOpened('news')} className="menu-item-has-children">
              {" "}
              <a href="#"> Новости </a>
              <ul className={`list-unstyled ${this.state.lists_is_opened.news ? 'dropdown_list_display_block' : ''}`}>
                <li>
                  {" "}
                  <a href="blog.html">Новости</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="single-blog.html">Детально Новости</a>{" "}
                </li>
              </ul>
            </li>
            <li onClick={()=>this.changeListOpened('production')} className="menu-item-has-children">
              {" "}
              <a href="#"> Продукция </a>
              <ul className={`list-unstyled ${this.state.lists_is_opened.production ? 'dropdown_list_display_block' : ''}`}>
                <li>
                  {" "}
                  <a href="shop.html">Продукция</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="product-details.html">Детально продукция</a>{" "}
                </li>
              </ul>
            </li>
            <li>
              <a href="contact.html">Контакты</a>
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

export default OverlayComponent;
