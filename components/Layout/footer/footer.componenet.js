import React from "react";
import axios from "axios";
import "../../../plugins/axios";
import Link from "next/link";
import url from "../../url";
import HeaderText from "../../../static/locales/header";

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
                <a href="/" locale={this.props.locale} className="f_logo">
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
                <h3 className="f_title">{HeaderText.[this.props.locale].footer[0]}</h3>
                <ul className="list-unstyled f_link f_link_two">
                  <li>
                    <Link href="/" locale={this.props.locale}>
                    <a>{HeaderText.[this.props.locale].nav[0]}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" locale={this.props.locale}>
                    <a>{HeaderText.[this.props.locale].nav[4]}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" locale={this.props.locale}>
                    <a>{HeaderText.[this.props.locale].nav[1].dropdown}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" locale={this.props.locale}>
                    <a>{HeaderText.[this.props.locale].nav[2]}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="contacts" locale={this.props.locale}>
                    <a>{HeaderText.[this.props.locale].nav[5]}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="news" locale={this.props.locale}>
                    <a>{HeaderText.[this.props.locale].nav[3]}</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="f_widget f_subscribe_widget">
                <h3 className="f_title">{HeaderText.[this.props.locale].footer[1]}</h3>
                <form action="#" className="f_subscribe">
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`${HeaderText.[this.props.locale].footer[2]}`}
                  />{" "}
                  <button type="submit" className="s_btn">
                    <i className="icon-email"></i>
                  </button>{" "}
                </form>
                <p>{HeaderText.[this.props.locale].footer[3]}</p>
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
                <Link href="/" locale={this.props.locale}>
                <a>{HeaderText.[this.props.locale].nav[0]}</a>
                </Link>
              </p>
            </div>
            <div className="col-sm-5 text-right">
              {" "}
             
              <a href="#" className="go_top">
              {HeaderText.[this.props.locale].footer[4]}<i className="fas fa-angle-up"></i>
              </a>
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