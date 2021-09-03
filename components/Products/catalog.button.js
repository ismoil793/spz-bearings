import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from "universal-cookie";
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import url from '../url';




export default class shopButton extends React.Component {
 
constructor(props){
    super(props)
   
    this.state = {
    cartNumber: props.cartNumber
    }
}


 moyMetod = () => {
  const notyf = new Notyf();
  const cookies = new Cookies();
    axios({
        method: 'post',
        url: `${url}/api/cart/add`,
        data: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
            quantity:1,
            item_shop_id: this.props.productss_id
        }
      }).then(response => {
        notyf.success("Ваш товар в корзине")  
        this.props.handler()     
}).catch(error => {
  notyf.error(error.data.message)
  })
  event.preventDefault();
}
    render() { 
     
     
        return (
         
        <>
         <button   
         onClick={this.moyMetod} 
         type="button" className="shop_cart_button"><a>В корзину</a></button> 
        </>
     
           
        )
      }
    }