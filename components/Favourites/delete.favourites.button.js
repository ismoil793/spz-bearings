import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import  '../../plugins/axios'
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import url from '../url';

export default class DeleteFavourite extends React.Component {

constructor(props){
    super(props)
}



deleteFavourites = () => {
  const notyf = new Notyf();
    axios({
        method: 'post',
        url: `${url}/api/user/favorites/toggle`,
        data: {
          product_id: this.props.favouriteID
        }
      }).then(response => {
      notyf.success("Вы удалили товар с Избранных?")   
      this.props.onDelete()    
      }).catch(error => {
    console.log(error);
  })

}
    render() { 
      
        return (
      
        
          <a onClick={this.deleteFavourites}  className="text-gray-32 font-size-26 pointer">×</a>
           
        )
      }
    }