import React from "react";
import axios from "axios";
import "../../../plugins/axios";
import Link from "next/link";
import url from "../../url";
import { connect } from "react-redux";

const PopularLink = props => (
  <Link
    href={{
      pathname: "/shop/[id]",
    }}
    as={`/shop/${props.slug}`}
  >
    <li>
      {" "}
      <a>{props.name}</a>
    </li>
  </Link>
);

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios
      .get(`${url}/api/home`, {
        params: {
          type: "popular_categories"
        }
      })
      .then(response => {
        this.setState({ categories: response.data.data.categories });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    return (
      <footer className="footer_area">
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="f_widget f_about_widget pr_100">
                {" "}
                <a href="index.html" className="f_logo">
                  {" "}
                  <img
                    src="/static/assets/img/img/home-one/logo_footer.png"
                    alt=""
                  />{" "}
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="f_widget f_link_widget">
                <h3 className="f_title">Полезные Ссылки</h3>
                <ul className="list-unstyled f_link f_link_two">
                  <li>
                    <a href="#">Главная</a>
                  </li>
                  <li>
                    <a href="#">Продукция</a>
                  </li>
                  <li>
                    <a href="#">О Нас</a>
                  </li>
                  <li>
                    <a href="#">Сервисы</a>
                  </li>
                  <li>
                    <a href="#">Контакты</a>
                  </li>
                  <li>
                    <a href="#">Партнеры</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="f_widget f_subscribe_widget">
                <h3 className="f_title">Обратная связь</h3>
                <form action="#" className="f_subscribe">
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ваш email - мы свяжемся"
                  />{" "}
                  <button type="submit" className="s_btn">
                    <i className="icon-email"></i>
                  </button>{" "}
                </form>
                <p>Мы готовы к сотрудничеству</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom border_top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-7">
              <p className="copy_text">
                {" "}
                <a href="index.html">Главная</a>
              </p>
            </div>
            <div className="col-sm-5 text-right">
              {" "}
              <a href="#" className="go_top">
                go back up <i className="fas fa-angle-up"></i>
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </footer>
    );
  }
}

const mapStateToProps = ({userInfo}) => {
  return {
    user: userInfo
  }
}

export default Footer;