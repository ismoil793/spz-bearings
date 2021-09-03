import React from "react";
import "../../plugins/axios";
import axios from "axios";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import url from "../url";
import { connect } from "react-redux";
import { fetchFavorites } from "../../redux/actions/favorites";

class FavouriteButton extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    }
  }

  addFavourites = () => {
    const notyf = new Notyf();
    const warning = new Notyf({
      types: [
        {
          type: 'warning',
          backgroundColor: 'orange',
          icon: false
        }
      ]
    });
    axios({
      method: "post",
      url: `${url}/api/user/favorites/toggle`,
      data: {
        product_id: this.props.product_id
      }
    })
      .then(response => {   
        this.setState(prevState => ({
          toggle: !prevState.toggle
        }));
        if(this.state.toggle == true){ 
          notyf.success(`${this.props.product_name} в избранных`);
        }else{
          notyf.error(`${this.props.product_name} удален с Избранных`);
        }
        this.props.getFavourites()
      })
      .catch(error => {
        warning.open({
          type: 'warning',
          message: 'Пожалуйста авторизуйтесь'
        });
        console.log(error);
      });
  };

 
  render() {
    return (
      <>
      {!this.state.toggle ?
         <a onClick={this.addFavourites} className="text-gray-6 pointer font-size-13 pr-3"><i className="ec ec-favorites mr-1 font-size-15"></i> Избранные</a>
        :
        ( <a onClick={this.addFavourites} className="text-red pointer font-size-13 pr-3"><i className="ec ec-favorites mr-1 font-size-15"></i> В избранных</a>)}
        
     
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFavourites: () => dispatch(fetchFavorites())
  }
}

export default connect(null, mapDispatchToProps)(FavouriteButton)
