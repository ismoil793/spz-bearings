import React from "react";
import { withRouter } from "next/router";
import axios from "axios";
import "../../plugins/axios";
import Redirect from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Router from "next/router";
import InputMask from "react-input-mask";

import Cookies from "universal-cookie";
import onClickOut from "react-onclickoutside";
import { css } from "@emotion/core";
import url from "../url";
import { connect } from "react-redux";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "",
      password: "",
      tokenLogin: [],
      isSignedUp: false,
    
    };
  }

  handleClickOutside = evt => {
    if (this.props.router.pathname !== '/login') {
    this.props.hide(false)
    }
   };
   

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount(){
   setTimeout(()=>{
      this.setState({
        isLoading:false
      })
  }, 100)
   
  }

  Login = e => {
    e.preventDefault();
    const notyf = new Notyf();
    const cookies = new Cookies();
    axios({
      method: "post",
      url: `${url}/api/auth/login`,
      data: {
        phone: this.state.phoneNumber.replace(/\s/g, "").replace("+", ""),
        password: this.state.password
      }
    })
      .then(response => {
        if (response.status === 200) {
         
          this.setState({ tokenLogin: response.data }); // after signing up, set the state to true. This will trigger a re-render
          //   cookies.set("user_id", response.data.access_token, {path: '/'});
          //   cookies.set("user_key", response.data.access_token, {path: '/'});
          cookies.set("access_token", response.data.access_token, {
            path: "/"
          });
          cookies.set("refresh_token", response.data.refresh_token, {
            path: "/"
          });
          cookies.set("user_id", response.data.user_id, {
            path: "/"
          });
        }
        const notyf = new Notyf();
        notyf.success("Вы успешно вошли в систему");
        setTimeout(() => {
          Router.push({
            pathname: `/user`
          });
        }, 100);
      })
      .catch(error => {
        console.log(error);
    
      });
  };

  render() {
    const { phoneNumber, password, tokenLogin, isSignedUp } = this.state;

    if (this.state.isSignedUp) {
      // redirect to home if signed up
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (

                                    <div id="login" data-target-group="idForm">
                             
                                        <header class="text-center mb-7">
                                        <h2 class="h4 mb-0">Здравствуйте!</h2>
                                        <p>Приятной вам покупки.</p>
                                        </header>
                                     

                                 <form  onSubmit={this.Login}>
                                 <>
                                        <div class="form-group">
                                            <div class="js-form-message js-focus-state">
                                                <label class="sr-only" for="signinEmail">Номер телефона</label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="signinEmailLabel">
                                                            <span class="fas fa-user"></span>
                                                        </span>
                                                    </div>
                                                    <InputMask  mask="999 99 999 99 99"  onChange={this.handleChange} name="phoneNumber" value={phoneNumber} placeholder="Номер телефона" className="form-control" id="phone"  required/> 
                                                </div>
                                            </div>
                                        </div>
                                      

                                 
                                        <div class="form-group">
                                            <div class="js-form-message js-focus-state">
                                              <label class="sr-only" for="signinPassword">Пароль</label>
                                              <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="signinPasswordLabel">
                                                        <span class="fas fa-lock"></span>
                                                    </span>
                                                </div>
                                                <input type="password" class="form-control" name="password" value={password}  onChange={this.handleChange} id="signinPassword" placeholder="" aria-label="Password" aria-describedby="signinPasswordLabel" required
                                                   data-msg="Your password is invalid. Please try again."
                                                   data-error-class="u-has-error"
                                                   data-success-class="u-has-success"/>
                                              </div>
                                            </div>
                                        </div>
                                      

                                        <div class="d-flex justify-content-end mb-4">
                                            <a class="js-animation-link small link-muted" href="javascript:;"
                                               data-target="#forgotPassword"
                                               data-link-group="idForm"
                                               data-animation-in="slideInUp">Забыли пароль?</a>
                                        </div>

                                        <div class="mb-2">
                                            <button type="submit" class="btn btn-block btn-sm btn-primary transition-3d-hover">Войти</button>
                                        </div>
                                        </>
                                        </form>

                                        <div class="text-center mb-4">
                                            <span class="small text-muted">У вас нет аккаунта?</span>
                                            <a class="js-animation-link small text-dark" href="javascript:;"
                                               data-target="#signup"
                                               data-link-group="idForm"
                                               data-animation-in="slideInUp">Зарегистрироваться
                                            </a>
                                        </div>
{/* <!-- 
                                        <div class="text-center">
                                            <span class="u-divider u-divider--xs u-divider--text mb-4"></span>
                                        </div> --> */}

{/*                                      
                                        <!-- <div class="d-flex">
                                            <a class="btn btn-block btn-sm btn-soft-facebook transition-3d-hover mr-1" href="#">
                                              <span class="fab fa-facebook-square mr-1"></span>
                                              Facebook
                                            </a>
                                            <a class="btn btn-block btn-sm btn-soft-google transition-3d-hover ml-1 mt-0" href="#">
                                              <span class="fab fa-google mr-1"></span>
                                              Google
                                            </a>
                                        </div> --> */}
                                     
                                    </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  setUserInfo: (userInfo) => dispatch(actions.setUser(userInfo))
}

export default connect(null,mapDispatchToProps)(withRouter(onClickOut(Login)));