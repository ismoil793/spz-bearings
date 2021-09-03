import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios'
import  '../../plugins/axios'
import Cookies from 'universal-cookie';
import url from '../url';

export default class CartCheckout extends React.Component {

                constructor(){
                    super()
                    this.state = {
                     cartProducts:[],
                
                    }   
                }


async componentDidMount(){
    const cookies = new Cookies();
   await axios({
        method: 'post',
        url: `${url}/api/order/create`,
        data: {
            device_token: cookies.get("device_token"),
            device_type: cookies.get("device_type"),
            user_id: cookies.get('user_id'),
            user_key: cookies.get('user_key'),
            delivery_id: 2,
            payment_id:3,
            address:{
                    phone:"998908082443",
                    name:"Address",
                    full_name:"Shokrukh",
                    address:"Hdasdsa ad ada",
                    region_id:2
                 }
        }
    }).then(response => {
    
        console.log(response.data.data)
        this.setState({cartProducts:response.data.data})
        }).catch(error => {
    console.log(error);
    
})
}

 render() { 

        return (
          
            <div class="section">

            <div class="action-bar is-centered">
                    <div class="steps-wrapper">
                        <ol class="step-list">
                            <li class="active"></li>
                            <li class="active"></li>
                            <li class="active"></li>
                            <li class="active"></li>
                        </ol>
                    </div>
                </div>
        
        <div class="container">

     
            <div class="columns account-header">
                <div class="column is-10 is-offset-1 checkout-wrapper is-tablet-landscape-padded">
                    
                    <div class="checkout-title">
                        <h2>Подтверждение</h2>
                        <h3>Заказ-485359</h3>
                    </div>
                  
                    <div class="flat-card is-auto is-checkout-form">
                        <div class="columns is-gapless is-vcentered">
                           
                            <div class="column is-4 has-text-centered grey-column is-padded">
                                <div class="verification-wrapper">
                                    <div class="total-price">
                                        <i data-feather="credit-card"></i>
                                        <span>Сумма заказа: </span>
                                        <span>706 480 сум</span>
                                        <span>4 продукта заказано</span>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="column is-8 is-padded items-column">
                             
                                <div class="order-item has-popover-top">
                                 
                                    <div class="item-description">
                                        <span>Доставка</span>
                                        <span>Метод: Доставка</span>
                                    </div>
                                    
                                    <div class="item-quantity has-text-centered">
                                        <span>К-во</span>
                                        <span>1</span>
                                    </div>
                                   
                                    <div class="item-price has-text-right">
                                        12 000 сум
                                    </div>
                                </div>

                              
                                <div class="webui-popover-content">
                                    <div class="popover-flex-block">
                                       
                                        <div class="icon-block">
                                            <img src="assets/images/logo/nephos.svg" alt=""/>
                                        </div>
                                      
                                        <div class="content-block">Метод доставки который вы выбрали ранее.</div>
                                    </div>
                                </div>

                              
                                <div class="order-item has-popover-top">
                                
                                    <div class="item-description">
                                        <span>Монитор</span>
                                        <span>SKU-8517</span>
                                    </div>
                                   
                                    <div class="item-quantity has-text-centered">
                                        <span>К-во</span>
                                        <span>1</span>
                                    </div>
                                  
                                    <div class="item-price has-text-right">
                                        384,000 сум
                                    </div>
                                </div>

                               
                                <div class="webui-popover-content">
                                    <div class="popover-flex-block">
                                       
                                        <div class="icon-block">
                                            <i data-feather="box" class="is-medium"></i>
                                        </div>
                                       
                                        <div class="content-block">
                                            <label>Категория товара</label>
                                            <span>Мониторы</span>
                                        </div>
                                    </div>
                                    <div class="popover-flex-block">
                                      
                                        <div class="icon-block">
                                            <i data-feather="bar-chart-2" class="is-medium"></i>
                                        </div>
                                      
                                        <div class="content-block">
                                            <label>Рейтинг</label>
                                            <span>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="popover-flex-block">
                                     
                                        <div class="icon-block">
                                            <i data-feather="dollar-sign" class="is-medium"></i>
                                        </div>
                                  
                                        <div class="content-block">
                                            <label>Цена</label>
                                            <span>384,000 сум</span>
                                        </div>
                                    </div>
                                </div>

                               
                                <div class="order-item has-popover-top">
                                   
                                    <div class="item-description">
                                        <span>Процессор</span>
                                        <span>SKU-2859</span>
                                    </div>
                                 
                                    <div class="item-quantity has-text-centered">
                                        <span>К-во</span>
                                        <span>1</span>
                                    </div>
                                 
                                    <div class="item-price has-text-right">
                                        258,000 сум
                                    </div>
                                </div>

                            
                                <div class="webui-popover-content">
                                    <div class="popover-flex-block">
                                        <div class="icon-block">
                                            <i data-feather="box" class="is-medium"></i>
                                        </div>
                                        <div class="content-block">
                                            <label>Категория товара</label>
                                            <span>House</span>
                                        </div>
                                    </div>
                                    <div class="popover-flex-block">
                                        <div class="icon-block">
                                            <i data-feather="bar-chart-2" class="is-medium"></i>
                                        </div>
                                        <div class="content-block">
                                            <label>Рейтинг</label>
                                            <span>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star-half"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="popover-flex-block">
                                        <div class="icon-block">
                                            <i data-feather="dollar-sign" class="is-medium"></i>
                                        </div>
                                        <div class="content-block">
                                            <label>Цена товара</label>
                                            <span>258,000 сум</span>
                                        </div>
                                    </div>
                                </div>

                             
                                <div class="order-item has-popover-top">
                                 
                                    <div class="item-description">
                                        <span>Мышка</span>
                                        <span>SKU-1998</span>
                                    </div>
                                   
                                    <div class="item-quantity has-text-centered">
                                        <span>К-во</span>
                                        <span>2</span>
                                    </div>
                                 
                                    <div class="item-price has-text-right">
                                        64,480 сум
                                    </div>
                                </div>

                                
                                <div class="webui-popover-content">
                                    <div class="popover-flex-block">
                                        <div class="icon-block">
                                            <i data-feather="box" class="is-medium"></i>
                                        </div>
                                        <div class="content-block">
                                            <label>Категория товара</label>
                                            <span>Комплекутующие</span>
                                        </div>
                                    </div>
                                    <div class="popover-flex-block">
                                        <div class="icon-block">
                                            <i data-feather="bar-chart-2" class="is-medium"></i>
                                        </div>
                                        <div class="content-block">
                                            <label>Рейтинг</label>
                                            <span>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="popover-flex-block">
                                        <div class="icon-block">
                                            <i data-feather="dollar-sign" class="is-medium"></i>
                                        </div>
                                        <div class="content-block">
                                            <label>Цена</label>
                                            <span>32,240</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="button-wrapper has-text-right">
                        <Link href="/checkout/payment/" class="button feather-button is-small primary-button upper-button raised">
                            <span>Назад</span>
                        </Link>
                        <Link href="checkout-step4.html" class="button feather-button has-text-right is-small primary-button upper-button raised">
                           <button onClick={this.MakeOrder}> <span>Оформить</span> </button> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    
    </div> )
      }
    }