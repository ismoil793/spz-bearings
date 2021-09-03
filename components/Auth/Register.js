import React from "react";
import axios from "axios";
import "../../plugins/axios";
import Cookies from "universal-cookie";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Router from "next/router";
import InputMask from "react-input-mask";


import { css } from "@emotion/core";
import url from "../url";
import onClickOut from "react-onclickoutside";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;`;
 class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "",
      code: "",
      name: "",
      surname: "",
      password: "",
      password_confirm: "",
      userkeyid: [],
      token: [],
      referal_id: '',
      isShow: false,
      email: "",
      checkbox: false,
      hide_login: false,
      show_code: false,
      isLoading: true,
      ref_id: null,
    };
  }

  // componentDidMount(){
  //   axios
  //     .get(`${url}/api/pages`, {
  //       params: {
  //         type: "signup"
  //       }
  //     })
  //     .then(response => {
        
  //       this.setState({
  //         ref_id: response.data.data.ref_id,
  //         isLoading:false
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });

    
  // }

  handleClickOutside = evt => {
      this.props.hide(false)
     };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Checkbox = e => {
    this.setState({
      checkbox: e.target.checked
    });
  };

  PhoneSend = e => {
    e.preventDefault();
    const { phoneNumber } = this.state;
    const notyf = new Notyf();
    axios({
      method: "post",
      url: `${url}/api/auth/code/create`,
      data: {
        phone: phoneNumber.replace(/\s/g, "").replace("+", "")
      }
    })
      .then(response => {
        notyf.success("Код был отправлен!");
        this.setState({
          show_code: true
        })
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  CodeSend = e => {
    e.preventDefault();
    const { code } = this.state;
    const cookies = new Cookies();
    const notyf = new Notyf();
    axios({
      method: "post",
      url: `${url}/api/auth/verify`,
      data: {
        phone: this.state.phoneNumber.replace(/\s/g, "").replace("+", ""),
        code: code
      }
    })
      .then(response => {
        this.setState(prevState => ({
          isShow: !prevState.isShow,
          hide_login: true
        }));

        this.setState({ userkeyid: response.data });

        cookies.set("user_key", response.data.key);
        cookies.set("user_id", response.data.id);
        notyf.success("Код был введен правильно!");
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  UserInfo = e => {
    e.preventDefault();
    const cookies = new Cookies();
    const notyf = new Notyf();
    axios({
      method: "post",
      url: `${url}/api/auth/signup`,
      data: {
        id: this.state.userkeyid.id,
        key: this.state.userkeyid.key,
        first_name: this.state.name,
        last_name: this.state.surname,
        password: this.state.password,
        password_confirmation: this.state.password_confirm,
      }
    })
      .then(response => {
        this.setState({ token: response.data });
        cookies.set("access_token", response.data.access_token, { path: "/" });
        cookies.set("refresh_token", response.data.refresh_token, {
          path: "/"
        });
        cookies.set("user_id", response.data.user_id, {
          path: "/"
        });

        notyf.success("Вы успешно зарегистрированы!");
        setTimeout(() => {
          Router.push({
            pathname: `/user`
          });
        }, 100);
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  render() {
    const {
      phoneNumber,
      code,
      userkeyid,
      name,
      surname,
      password,
      password_confirm,
      token,
      referal_id,
      email
    } = this.state;

    

    return (
 
                  <div id="signup"  data-target-group="idForm">
                                    
                                        <header className="text-center mb-7">
                                        <h2 className="h4 mb-0">Здравствуйте.</h2>
                                        <p>Добро пожаловать в самый большой онлайн-магазин кухонного оборудования в Узбекистане.</p>
                                        </header>
                                   

                                       <form onSubmit={this.PhoneSend}>
                                        <div className="form-group">
                                            <div className="js-form-message js-focus-state">
                                                <label className="sr-only" for="signupEmail">Номер телефона</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="signupEmailLabel">
                                                            <span className="fas fa-user"></span>
                                                        </span>
                                                    </div>
                                                    <InputMask  mask="999 99 999 99 99"  onChange={this.handleChange} name="phoneNumber" value={phoneNumber} placeholder="Номер телефона" className="form-control" id="phone"  required/> 
                                                  
                                                </div>
                                            </div>
                                        </div>
                                        {!this.state.show_code ? (
                                        <div className="mb-2">
                                            <button type="submit" className="btn btn-block btn-sm btn-primary transition-3d-hover">Получить код</button>
                                        </div>) : null}
                                      </form>
                                      
                                    {this.state.show_code ? (
                                      <form onSubmit={this.CodeSend}>
                                        <div className="form-group">
                                            <div className="js-form-message js-focus-state">
                                                <label className="sr-only" for="signupPassword">Код подверждения</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="signupPasswordLabel">
                                                            <span className="fas fa-lock"></span>
                                                        </span>
                                                    </div>
                                                    <input type="text" className="form-control" name="code"  value={this.state.code} onChange={this.handleChange} id id="signupPassword" placeholder="Код" required
                                             />
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.show_code ? (
                                        <div className="mb-2">
                                            <button type="submit" className="btn btn-block btn-sm btn-primary transition-3d-hover">Подтвердить</button>
                                        </div>) : null}
                                        </form>
                                        ) : null}
                                      
                                      {this.state.isShow ? (
                                        <form onSubmit={this.UserInfo}>
                                        <>
                                         <div className="form-group">
                                            <div className="js-form-message js-focus-state">
                                            <label className="sr-only" for="signupConfirmPassword">Имя</label>
                                                <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="signupConfirmPasswordLabel">
                                                        <span className="fas fa-key"></span>
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control" name="name" value={name}  onChange={this.handleChange} id="signupConfirmPassword" placeholder="Имя" aria-label="Confirm Password" aria-describedby="signupConfirmPasswordLabel" required
                                               />
                                                </div>
                                            </div>
                                        </div>
                                      

                                        
                                         <div className="form-group">
                                            <div className="js-form-message js-focus-state">
                                            <label className="sr-only" for="signupConfirmPassword">Фамилия</label>
                                                <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="signupConfirmPasswordLabel">
                                                        <span className="fas fa-key"></span>
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control"  name="surname" value={surname}  onChange={this.handleChange} id="signupConfirmPassword" placeholder="Фамилия" aria-label="Confirm Password" aria-describedby="signupConfirmPasswordLabel" required
                                               />
                                                </div>
                                            </div>
                                        </div>
                                      


                                        
                                         <div className="form-group">
                                            <div className="js-form-message js-focus-state">
                                            <label className="sr-only" for="signupConfirmPassword">Пароль</label>
                                                <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="signupConfirmPasswordLabel">
                                                        <span className="fas fa-key"></span>
                                                    </span>
                                                </div>
                                                <input type="password" className="form-control"  name="password" value={password}  onChange={this.handleChange} id="signupConfirmPassword" placeholder="Введите пароль" aria-label="Confirm Password" aria-describedby="signupConfirmPasswordLabel" required
                                                data-msg="Password does not match the confirm password."
                                                data-error-className="u-has-error"
                                                data-success-className="u-has-success"/>
                                                </div>
                                            </div>
                                        </div>
                                      

                                       
                                        <div className="form-group">
                                            <div className="js-form-message js-focus-state">
                                            <label className="sr-only" for="signupConfirmPassword">Подтвердите пароль</label>
                                                <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="signupConfirmPasswordLabel">
                                                        <span className="fas fa-key"></span>
                                                    </span>
                                                </div>
                                                <input type="password" className="form-control" name="password_confirm" value={password_confirm}  onChange={this.handleChange} id="signupConfirmPassword" placeholder="Подтвердите пароль" aria-label="Confirm Password" aria-describedby="signupConfirmPasswordLabel" required
                                                data-msg="Password does not match the confirm password."
                                                data-error-className="u-has-error"
                                                data-success-className="u-has-success"/>
                                                </div>
                                            </div>
                                        </div>
                                      

                                        <div className="mb-2">
                                            <button type="submit" className="btn btn-block btn-sm btn-primary transition-3d-hover">Зарегистрироваться</button>
                                        </div>
                                        </>
                                        </form>
                                      ) : null}
                                        <div className="text-center mb-4">
                                            <span className="small text-muted">У вас уже есть аккаунт?</span>
                                            <a className="js-animation-link small text-dark" href="javascript:;"
                                                data-target="#login"
                                                data-link-group="idForm"
                                                data-animation-in="slideInUp">Авторизоваться
                                            </a>
                                        </div>

                                     
                                      
                                    </div>
                                  
    );
  }
}
export default onClickOut(Register);