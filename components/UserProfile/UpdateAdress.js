import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cookies from "universal-cookie";
import MyAdresses from "./myAdresses";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import Router from 'next/router'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import InputMask from "react-input-mask";
import url from "../url";




export default class UpdateAdress extends React.Component {
  constructor() {
    super();
    this.state = {
     address: [],
      cities: [],
      regions: [],
      userInfo: {},
      name: "",
      image:null,
      fio: "",
      phone: "",
      regionID: "",
      adress: "",


    };
  }



  GetRegion = e => {
    e.preventDefault();

    let regionID = e.target.value;

    axios
      .get(`${url}/api/regions`, {
        params: {
          city_id: regionID
        }
      })
      .then(response => {
        this.setState({ regions: response.data.data });
      })
      .catch(error => {
        notyf.error(error.data.message)
      });
  };

  



 

  UpdateAddress = e => {
    e.preventDefault();
    const notyf = new Notyf()
    axios({
      method: "put",
      url: `${url}/api/user/address/update/${this.props.address_id}`,
      data: {
       name: this.state.name,
       full_name: this.state.fio,
       address: this.state.adress,
       region_id: this.state.regionID,
       phone: this.state.phone,
      }
    })
      .then(response => {
        notyf.success("Ваш старый пароль обновлен");
        this.setState({ 
          old_password: "",
        password:"",
        password_confirmation: ""
      })
      })
      .catch(error => {
        notyf.error(error.data.message)
      });
  };
 
  componentDidMount() {
    const cookie = new Cookies();
    //Myorders placing to a table
    axios
      .get(`${url}/api/user/address`,{
          params:{
              address_id: this.props.address_id
          }
      })
      .then(response => {
        this.setState({
          address: response.data.data
        });
       
      })
      .catch(error => {
        notyf.error(error.data.message)
      });

    // Cities axios getting data and binding with region
    axios
      .get(`${url}/api/cities`)
      .then(response => {
        this.setState({ cities: response.data.data });
      })
      .catch(error => {
        notyf.error(error.data.message)
      });

    //User Profile Info
    axios
      .get(`${url}/api/user/info`)
      .then(response => {
        this.setState({ userInfo: response.data.data });
      })
      .catch(error => {
        notyf.error(error.data.message)
      });
  }

 

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

 

  render() {
     const {
      cities,
      regions,
      name,
      fio,
      phone,
      regionID,
      adress,
      userInfo,
      image
    } = this.state;
    
    
    
    return (
      <div className="single_product">
        <div className="container">
          <div className="col-lg-12 order-3">
            <div className="row">
              <div className="col-lg-2 col-xs-4 ">
              {(userInfo.image) ? ( 
                <ul className="image_list">
                  <li data-image="images/profile_img.png">
                    <img src={userInfo.image.url} alt="Профиль" />
                  </li>
                </ul>
                ):(
                <ul className="image_list">
                <li data-image="images/profile_img.png">
                  <img src="/static/assets/template/avtech/images/profile_img.png" alt="Профиль" />
                </li>
              </ul>
              )}
              </div>

              <div className="col-lg-8 col-md-9 col-xs-4">
                <div className="product_description">
                  <div className="product_name">{userInfo.first_name} {userInfo.last_name}</div>

                  <div className="product_text">
                    <p>Телефон: +{userInfo.phone}</p>
                  </div>
                  
               
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 order-3">

              <div className="maincontent">
            
             
                  <div className="ux-text">
                    <div className="row">
                      <div className="col-md-9">
                        <h3>Изменить Адрес</h3>{" "}
                      </div>
                   
                    </div>
                   
                 

                   
                      <div className="newsletter_content clearfix">
                        <form
                          onSubmit={this.UpdateAddress}
                          action="#"
                          className="newsletter_form"
                        >
                          <div className="row">
                            <div className="col-md-6">
                              {" "}
                              <input
                                type="text"
                                className="adress_input"
                                required="required"
                                placeholder="Введите наименование"
                                onChange={this.handleChange}
                                value={name}
                                name="name"
                              />
                            </div>
                            <div className="col-md-6">
                              {" "}
                              <input
                                type="text"
                                className="adress_input"
                                required="required"
                                placeholder="Введите ФИО получателя"
                                onChange={this.handleChange}
                                name="fio"
                                value={fio}
                              />
                            </div>
                            <div className="col-md-12">
                              {/* <input
                                type="text"
                                className="adress_input"
                                required="required"
                                placeholder="Введите номер получателя"
                                onChange={this.handleChange}
                                name="phone"
                                value={phone}
                              /> */}
                               <InputMask  
                               mask="+999 99 999 99 99"  
                               type="text"
                               className="adress_input"
                               required="required"
                               placeholder="Введите номер получателя"
                               onChange={this.handleChange}
                               name="phone"
                               value={phone}
                               />  
                            </div>

                            <div className="col-md-6">
                              <label className="checkout-label">Город</label>

                              <div className="control">
                                {cities ? (
                                  <select
                                    onChange={this.GetRegion}
                                    className="adress_input"
                                    required
                                  >
                                    <option value="0">
                                      Выберите Город
                                    </option>
                                    {cities.map(city => (
                                      <option key={city.id} value={city.id}>
                                        {city.name}
                                      </option>
                                    ))}
                                  </select>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <label className="checkout-label">Регион</label>

                              <div className="control">
                                <select
                                  onChange={this.handleChange}
                                  value={regionID}
                                  name="regionID"
                                  className="adress_input"
                                  required
                                >
                                  <option disabled selected value="0">
                                    Выберите Регион
                                  </option>
                                  {regions
                                    ? regions.map(region => (
                                        <option value={region.id}>
                                          {region.name}
                                        </option>
                                      ))
                                    : null}
                                </select>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <input
                                type="text"
                                className="adress_input"
                                required="required"
                                placeholder="Адрес"
                                onChange={this.handleChange}
                                name="adress"
                                value={adress}
                              />
                            </div>
                          </div>

                          <button
                           
                            type="submit"
                            className="button"
                          >
                            Сохранить
                          </button>
                        </form>
                      </div>
                  
                  </div>
              
             
         
              </div>
         
          </div>
        </div>
      </div>
    );
  }
}
