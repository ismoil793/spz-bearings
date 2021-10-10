import React from "react";
import axios from "axios";
import "../../../plugins/axios";
import Link from "next/link";
import url from "../../url";
import HeaderText from "../../../static/locales/header";
import FadeTop from "../../Animations/FadeTop";
import Fade from "../../Animations/Fade";
import {withRouter} from "next/router";

class Footer extends React.Component {
   state = {
      categories: []
   }

   componentDidMount() {
      axios
          .get(`${url}/api/home`, {
             params: {
                type: "popular_categories"
             }
          })
          .then(response => {
             this.setState({categories: response.data.data.categories});
          })
          .catch(error => {
             console.log(error);
          });
   }

   render() {

      return (
          <footer className="footer_area">
             <div className="footer_top">
                <div className="container">
                   <div className="row">
                      <div className="col-lg-4 col-md-6">
                         <div className="f_widget f_about_widget pr_100">
                            <Fade scale={0.6} delay={0.3}>
                               <a href="/" className="f_logo">
                                  <img className="footer-logo_main"
                                       src="/static/assets/img/img/home-one/logo_footer.png"
                                       alt=""
                                  />
                               </a>
                            </Fade>
                         </div>
                      </div>
                      <div className="col-lg-4 col-md-6">
                         <FadeTop delay={0.5}>
                            <div className="f_widget f_link_widget">
                               <h3 className="f_title">{HeaderText[this.props.locale].footer[0]}</h3>
                               <ul className="list-unstyled f_link f_link_two">
                                  <li>
                                     <Link href="/" locale={this.props.locale}>
                                        <a>{HeaderText[this.props.locale].nav[0]}</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href={"/shop"} locale={this.props.locale}>
                                        <a>{HeaderText[this.props.locale].nav[4]}</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href={"/about"} locale={this.props.locale}>
                                        <a>{HeaderText[this.props.locale].nav[1].dropdown}</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href={"/services"} locale={this.props.locale}>
                                        <a>{HeaderText[this.props.locale].nav[2]}</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href={"/contacts"} locale={this.props.locale}>
                                        <a>{HeaderText[this.props.locale].nav[5]}</a>
                                     </Link>
                                  </li>
                                  <li>
                                     <Link href={"/news"} locale={this.props.locale}>
                                        <a>{HeaderText[this.props.locale].nav[3]}</a>
                                     </Link>
                                  </li>
                               </ul>
                            </div>
                         </FadeTop>
                      </div>
                      <div className="col-lg-4">
                         <FadeTop delay={0.4}>
                            <div className="f_widget f_subscribe_widget">
                               <h3 className="f_title">{HeaderText[this.props.locale].footer[1]}</h3>
                               <form
                                   onSubmit={e => e.preventDefault()}
                                   onClick={() => {
                                      this.props.router.push('/contacts')
                                   }}
                                   className="f_subscribe"
                               >
                                  <input
                                      type="text"
                                      className="form-control"
                                      disabled={true}
                                      value={`${HeaderText[this.props.locale].footer[2]}`}
                                      placeholder={`${HeaderText[this.props.locale].footer[2]}`}
                                  />
                                  <button type="submit" className="s_btn">
                                     <i className="icon-email"/>
                                  </button>
                               </form>
                               <p>{HeaderText[this.props.locale].footer[3]}</p>
                            </div>
                         </FadeTop>
                      </div>
                   </div>
                </div>
             </div>
             <div className="footer_bottom border_top">
                <div className="container">
                   <div className="row align-items-center">
                      <div className="col-sm-7">
                         <p className="copy_text">
                            <Link href="/" locale={this.props.locale}>
                               <a>{HeaderText[this.props.locale].nav[0]}</a>
                            </Link>
                         </p>
                      </div>
                      <div className="col-sm-5 text-right">
                         <a href="#" className="go_top">
                            {HeaderText[this.props.locale].footer[4]}<i className="fas fa-angle-up"/>
                         </a>
                      </div>
                   </div>
                </div>
             </div>
          </footer>
      );
   }
}

export default withRouter(Footer);