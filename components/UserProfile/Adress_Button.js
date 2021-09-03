import React from "react";
import axios from "axios";
import "../../plugins/axios";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import Cookies from "universal-cookie";
import Link from "next/link";
import url from "../url";

const UpdareLink = props => (
  
  <Link href={{pathname:"/user/update/[updateadress]", query:{address_id:props.adress_id}}} as={`/user/update/${props.address_id}`}>
  <button className="btn change">Изменить</button>
  </Link> 
);


export default class AdressButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myAdresses: [],
      main: []
    };
  }

  MakeMain = e => {
    const notyf = new Notyf()
    e.preventDefault();
    axios({
      method: "post",
      url: `${url}/api/user/address/main/${this.props.adressID}`
    })
      .then(response => {
        this.setState({ main: response.data.data });
        this.props.getAdresses()
        notyf.success("Успешно сделано главным");
      })
      .catch(error => {
        notyf.error(error.data.message)
      });
  };

  DeleteAdress = n => {
    const notyf = new Notyf()
    n.preventDefault();
    axios({
      method: "delete",
      url: `${url}/api/user/address/delete/${this.props.adressID}`
    })
      .then(response => {
        notyf.success("Успешно удалено");
        this.props.getAdresses()
      })
      .catch(error => {
        notyf.error(error.data.message)
      });
  };

  render() {
    const { myAdresses, main } = this.state;
    console.log(main);
    console.log(myAdresses);

    return (
      <div className="demo">
        <button onClick={this.MakeMain} className="btn main">
          Сделать основным
        </button>
        <button onClick={this.DeleteAdress} className="btn delete">
          Удалить
        </button>
       <UpdareLink address_id={this.props.id}/>
      </div>
    );
  }
}
