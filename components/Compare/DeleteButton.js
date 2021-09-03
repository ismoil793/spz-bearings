import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import  '../../plugins/axios'
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Cookies from 'universal-cookie'
import url from '../url';

export default class DeleteButtonCompare extends React.Component {

constructor(props){
    super(props)
}



DeleteCompare = () => {
    const cookies = new Cookies();
    const notyf = new Notyf();
    axios({
        method: 'post',
        url: `${url}/api/comparison/toggle`,
        data: {
          device_token: cookies.get("device_token"),
          device_type: cookies.get("device_type"),
            product_id: this.props.ID
        }
      }).then(response => {
        notyf.error("Товар удален со Сравнений")  
        this.props.onDelete()     
      }).catch(error => {
    console.log(error);
  })

}
    render() { 
      
        return (
          <>
            <button  onClick={this.DeleteCompare}  className="deleteButton cart_item_text"><img style={{width: '100%'}} src="/static/assets/template/avtech/images/error.png" alt="delete"/></button>
          
            <style jsx>{`
            .deleteButton {
                background: transparent;
               border: none;
               cursor:pointer;
               width: 25px;
              }
          `}</style> 

     </>
           
        )
      }
    }