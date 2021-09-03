import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios'
import  '../../plugins/axios'
import Cookies from 'universal-cookie'
import url from '../url';




export default class Verification extends React.Component {

                constructor(){
                    super()
                    this.state = {
                    phoneNumber:'',
                    code:''
                    }
                }




        handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
        }

            PhoneSend = (e) =>{
                e.preventDefault();
                const {phoneNumber} = this.state
                axios({
                    method: 'post',
                    url: `${url}/api/auth/code/update`,
                    data: {
                        phone: phoneNumber
                    }
                }).then(response => {
                    
                    alert('Пароль был отправлен') 
                
            }).catch(error => {
                console.log(error);
            })
            }


            CodeSend = (e) => {
                e.preventDefault();
                const {code} = this.state
                const cookies = new Cookies();
                axios({
                    method: 'post',
                    url: `${url}/api/auth/verify`,
                    data: {
                        phone: "998977337303",
                        code: code
                    }
                }).then(response => {
                    alert('Вы успешно зарегистрированы') 
                    cookies.set("user_key", response.data.key);
                    cookies.set("user_id", response.data.id);
                    }).catch(error => {
                console.log(error);
            })
            }



 render() { 
        const cookies = new Cookies();
        const {phoneNumber, code} = this.state
       
        return (
    

            <>
    
             {cookies.get("user_id") ? (
                 <div class="columns account-header">
                 <div class="column is-10 is-offset-1 checkout-wrapper is-tablet-landscape-padded">
                     <div class="checkout-title">
                         <h2>Подтверждение покупки</h2>
                       </div>
                </div>
             </div> ):(
                            <div class="columns account-header">
                            <div class="column is-4 is-offset-1 checkout-wrapper is-tablet-landscape-padded">
                                <div class="checkout-title">
                                    <h2>Подтверждение покупки</h2>
                                
                                </div>
                          
                                <div class="flat-card is-auto is-checkout-form">
                                    <div class="columns is-gapless is-vcentered">
                                     
                                  
                                
                                        <div class="column is-12 is-padded">
                                            <form onSubmit={this.PhoneSend}>
        
                                                        <div class="control">
                                                            <label class="checkout-label">Номер телефона*</label>
                                                            <input type="text" onChange={this.handleChange} name="phoneNumber" value={phoneNumber} class="input" placeholder=""/>
                                                        </div>     
                                                        
                                                        <div class="button-wrapper has-text-right">
                                                            <button type="submit" class="button feather-button is-small primary-button upper-button raised">
                                                                <span>Отправить</span>
                                                            </button>
                                                        </div> 
                                            </form>
        
                                            <form onSubmit={this.CodeSend}>
                                                            <div class="control">
                                                                    <label class="checkout-label">СМС код*</label>
                                                                    <input type="text" onChange={this.handleChange} name="code" value={code} class="input" placeholder="" />
                                                                </div>     
                                                                <div class="button-wrapper has-text-right">
                                                              <button type="submit" class="button feather-button is-small primary-button upper-button raised">
                                                                    <span>Подтверждение</span>
                                                                </button>
                                                            </div> 
                                                       </form>  
                                                          
                                        </div>
        
                                      
                                    </div>
                                </div>
                        
                            </div>
                        </div>





                   
                )}
            
      
       </>
  
   
        )
      }
    }