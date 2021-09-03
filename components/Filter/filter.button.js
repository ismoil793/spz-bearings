import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

import axios from 'axios'
import url from '../url';




export default class FilterButton extends React.Component {
 
constructor(props){
    super(props)
   
    this.state = {
     products:[],
    
    }
}


getProducts = () => {
    axios.get(`${url}/api/products`, {
      params: {
        category_id: this.props.category_id
        }
  }).then(response => {
  this.setState({products: response.data.data,
  totalProducts: response.data.meta})
  

  }).catch(error => {
      console.log(error);
    });
  }
    render() { 
     
     
        return (
          <button onClick={this.getProducts}  className="button_contact">
         <a>Показать</a>
         </button> 
         )
      }
    }