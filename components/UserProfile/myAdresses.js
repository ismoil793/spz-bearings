import React from "react";
import axios from "axios";
import "../../plugins/axios";

import Cookies from "universal-cookie";
import AdressButton from "./Adress_Button";
import url from "../url";

export default class MyAdresses extends React.Component {
  constructor() {
    super();
    this.state = {
      myAdresses: []
    };
  }

  componentDidMount() {
    this.getAdresses();
  }

  getAdresses = () => {
    const cookie = new Cookies();
    axios
      .get(`${url}/api/user/address`)
      .then(response => {
        this.setState({
          myAdresses: response.data.data
        });
   
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { myAdresses } = this.state;

    return (
      <>
        {myAdresses && myAdresses.length  ? (
          myAdresses.map(myadress => (
            <div className="adress_divs">
              <h4 style={{ color: "#018000" }}>{myadress.name}</h4>
              {myadress.main === 1 ? (
                <p style={{ color: "#F33338" }}>Основной адрес</p>
              ) : null}

              <div className="row">
                <div className="col-md-4">
                <div className="row">
                  <div className="col-md-4">
                       <img
                      src="/static/assets/img/contact_1.png"
                      alt="contact1"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="contact_info_title"><b>Контакты</b></div>
                    <div className="contact_info_text">
                      {myadress.full_name} <br /> +{myadress.phone}
                    </div>
                  </div>
                  </div>
                </div>

                <div className="col-md-4">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="/static/assets/img/contact_3.png"
                      alt="contact3"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="contact_info_title"><b>Город и регион</b></div>
                    <div className="contact_info_text">
                      {myadress.region.city.name} {myadress.region.name}
                    </div>
                  </div>
                  </div>
                </div>

                <div className="col-md-4">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="/static/assets/img/contact_3.png"
                      contact1
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="contact_info_title"><b>Адрес</b></div>
                    <div className="contact_info_text">{myadress.address} </div>
                  </div>
                  </div>
                </div>
             
                <AdressButton
                  getAdresses={this.getAdresses}
                  adressID={myadress.id}
                />
              </div>
            </div>
          ))
        ) : (
        <p>У вас нету адресов</p>
        )}
      </>
    );
  }
}
