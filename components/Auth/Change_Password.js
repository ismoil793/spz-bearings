import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios'
import  '../../plugins/axios'
import Cookies from "universal-cookie";
import { Notyf } from 'notyf';
import Router from 'next/router'
import 'notyf/notyf.min.css'; 
import InputMask from 'react-input-mask';
import url from '../url'

 


export default class ChangePassword extends React.Component {

                constructor(){
                    super()
                    this.state = {
                    phoneNumber:'',
                    code:'',
                    name:'',
                    surname: '',
                    password: '',
                    password_confirm:'',
                    userkeyid: [],
                    token:[], 
                    isShow: false
                    }
                }




        handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
        }

           RequestCode = (e) =>{
            const notyf = new Notyf()
                e.preventDefault();
                const {phoneNumber} = this.state
                axios({
                    method: 'post',
                    url: `${url}/api/auth/code/update`,
                    data: {
                        phone: phoneNumber.replace(/\s/g, '')
                    }
                }).then(response => {
                    
                    notyf.success('Пароль был отправлен') 
                
            }).catch(error => {
               notyf.error(error.data.message)
            })
            }


            Verification = (e) => {
                const notyf = new Notyf()
                e.preventDefault();
                const {code} = this.state
                const cookies = new Cookies();
                axios({
                    method: 'post',
                    url: `${url}/api/auth/verify`,
                    data: {
                        phone: this.state.phoneNumber.replace(/\s/g, ''),
                        code: code
                    }
                }).then(response => {
                    this.setState(prevState => ({
                        isShow: !prevState.isShow
                      }));
                    this.setState({userkeyid: response.data})
             
                    cookies.set("user_key", response.data.key);
                    cookies.set("user_id", response.data.id);
                  
                    notyf.success('Вы можете сменить пароль')
                    
                    }).catch(error => {
                        notyf.error(error.data.message)
                    })
            }



           UserInfo = (e) => {
                e.preventDefault();
                const notyf = new Notyf()
                const cookies = new Cookies();
                axios({
                    method: 'post',
                    url: `${url}/api/auth/password/forgot`,
                    data: {
                          id: cookies.get("user_id"),
                         key:cookies.get("user_key"),
                         password: this.state.password,
                        password_confirmation: this.state.password_confirm
                    }
                }).then(response => {
                    this.setState({token: response.data})
                    cookies.remove("user_id");
                    cookies.remove("user_key");
           
                    notyf.success('Ваш пароль успешно изменен') 
                    setTimeout(() =>{
                        Router.push({
                        pathname:`/login`
                    })
                 },100) 
                    }).catch(error => {
                        notyf.error(error.data.message)
            })
            }
       



 render() { 
       
        const {phoneNumber, code, password, password_confirm} = this.state
        return (


            <div className="contact_form">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 ">
                        <div className="contact_form_container">
                            <div className="contact_form_title" style={{color: "#00348c"}}>
                                <h2 style={{color:"#3c3c3c"}}>Смена пароля</h2>
                            </div>
    
                            <div className="page-content">
                                <div className="form-v10-content">
                                    <div  className="form-detail" action="#"  id="myform">
    
                                        <div className="form-right">
                                            <h2>Введите номер телефона</h2>
                                          
                                            <div className="form-group" id="code_block">
                                            <form onSubmit={this.RequestCode}>
                                                <div className="form-row form-row-2">
                                                   <div className="col-md-6"> 
                                                   <InputMask  mask="999 99 999 99 99"  onChange={this.handleChange} name="phoneNumber" value={phoneNumber} placeholder="Номер телефона" className="phone" id="phone"  required/> 
                                                    </div>
                                                   <div className="col-md-6"><button type="submit" style={{height:"50px"}} className="register"> Отправить </button> </div>  
                                                </div>
                                            </form>
                                            </div>
                                            {/* <div className="form-row" id="phone_block">

                                            <form onSubmit={this.PhoneSend}  action="#" method="post" >
                                                <input type="text" onChange={this.handleChange} name="phoneNumber" value={phoneNumber}  className="phone" id="phone" placeholder="998 9х ххх хх хх" required/>
    
                                                <div className="row" style={{bottom:"-30px"}}>
                                                    <button type="submit" style={{height:"50px"}} className="register">Отправить </button>
                                                  
                                                 </div>
                                                </form>
                                            </div> */}
                                           
    
    
    
    
                                            <div className="form-group" id="code_block">
                                            <form onSubmit={this.Verification}>
                                                <div className="form-row form-row-2">
                                                   <div className="col-md-6"> <input type="text"  className="code" onChange={this.handleChange} name="code" value={code} id="code" placeholder="Код" required/>  </div>  
                                                   <div className="col-md-6"><button type="submit" style={{height:"50px"}} className="register"> Подтвердить </button> </div>  
                                                </div>
                                            </form>
                                            </div>
                                            {this.state.isShow ? (
                                            <form onSubmit={this.UserInfo}>
                                            <div id="last_block">
                                              
                                                  <div className="form-group">
                                                    <div className="form-row form-row-1">
                                                        <input type="password" id="password" onChange={this.handleChange} name="password" value={password} className="input-text" placeholder="Новый Пароль" required/>
                                                    </div>
                                                    <div className="form-row form-row-2">
                                                        <input type="password"  id="repeat" onChange={this.handleChange} name="password_confirm" value={password_confirm}  className="input-text" placeholder="Повторите пароль" required/>
                                                    </div>
                                                </div>
    
                                                {/* <div className="form-checkbox">
                                                    <label className="container">
                                                        <p>Я даю соглашение <a href="#" className="text">на обработку</a> моих персональных данных.</p>
                                                        <input type="checkbox" name="checkbox"/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div> */}
                                                <div className="form-row-last">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="submit" name="register" className="register" value="Поменять пароль"/>
                                                        </div>
                                                     </div>
                                                </div>
    
                                            </div>
                                            </form>
                                            ): null}
    
                                        </div>
                                        </div>
                                </div>
                            
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
            </div>
      
        )
      }
    }