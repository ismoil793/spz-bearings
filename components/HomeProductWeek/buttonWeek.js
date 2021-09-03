import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import url from "../url";

export default class MainButtonProductCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartproducts: []
    };
  }

  moyMetod = () => {
    const notyf = new Notyf();
    const cookies = new Cookies();
    axios({
      method: "post",
      url: `${url}/api/cart/add`,
      data: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        quantity: 1,
        item_shop_id: this.props.productss_id
      }
    })
      .then(response => {
        this.props.handleChild()
        notyf.success("Ваш товар в корзине");
        this.setState({ cartproducts: response.data.data });
         
        // event.preventDefault();
      })
      .catch(error => {
        notyf.error(error.data.message)
      });
    event.preventDefault();
  };
  render() {
    return (
      <div className="button_container">
        <button
          onClick={this.moyMetod}
          type="button"
          style={{ backgroundColor: "#028c29", color: "#ffffff" }}
          className="cart_button"
        >
          В корзину
        </button>
       
      </div>
    );
  }
}
