import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cookies from "universal-cookie";
import MyAdresses from "./myAdresses";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Router from "next/router";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import InputMask from "react-input-mask";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import url from "../url";
import { connect } from "react-redux";
import { fetchSetUserInfo, removeUserInfo } from '../../redux/actions/userInfo'

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

const OrderLink = props => (
  <Link
    href={{ pathname: "/user/[order]", query: { order_id: props.id } }}
    as={`user/${props.id}`}
  >
    <button  className="btn btn-primary-dark-w px-5">Просмотр</button>
  </Link>
);

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      myOrders: [],
      cities: [],
      regions: [],
      userInfo: {},
      name: "",
      image: null,
      fio: "",
      phone: "",
      regionID: "",
      adress: "",
      opened: false,
      first_name: "",
      last_name: "",
      image: "",
      password: "",
      password_confirmation: "",
      old_password: "",
      isShowAdressForm: false,
      isLoading: true
    };
  }

  changeImageHandler = e => {
    this.setState({ image: e.target.files[0] });
  };

  toggleBox = () => {
    this.setState(prevState => ({
      isShowAdressForm: !prevState.isShowAdressForm
    }));
  };
  AdressForm = e => {
    const notyf = new Notyf();
    e.preventDefault();
    const { adress } = this.state;
    axios({
      method: "post",
      url: `${url}/api/user/address/add`,
      data: {
        name: this.state.name,
        full_name: this.state.fio,
        address: this.state.adress,
        region_id: this.state.regionID,
        phone: this.state.phone.replace(/\s/g, "").replace("+", "")
      }
    })
      .then(response => {
        notyf.success("У вас новый адрес");
        this.setState(prevState => ({
          isShowAdressForm: !prevState.isShowAdressForm
        }));

        this.setState({
          name: "",
          fio: "",
          adress: "",
          regionID: "",
          phone: ""
        });
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  UpdateUserInfo = e => {
    const notyf = new Notyf();
    var formData = new FormData();

    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);

    if (this.state.image) {
      formData.append("image", this.state.image);
    }

    e.preventDefault();

    axios
      .post(`${url}/api/user/info/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        notyf.success("Информация обновлена");
        axios
          .get(`${url}/api/user/info`)
          .then(response => {
            this.setState({ userInfo: response.data.data });
            
          })
          .catch(error => {
            notyf.error(error.data.message);
          });
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  UpdateUserPassword = e => {
    e.preventDefault();
    const notyf = new Notyf();
    axios({
      method: "post",
      url: `${url}/api/auth/password/change`,
      data: {
        old_password: this.state.old_password,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    })
      .then(response => {
        notyf.success("Ваш старый пароль обновлен");
        this.setState({
          old_password: "",
          password: "",
          password_confirmation: ""
        });
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  componentDidMount() {
    const cookie = new Cookies();
    //Myorders placing to a table
    const notyf = new Notyf();
    axios
      .get(`${url}/api/user/orders`)
      .then(response => {
        this.setState({
          myOrders: response.data.data,
          isLoading: false
        });
      })
      .catch(error => {
        notyf.error(error.data.message);
      });

    // Cities axios getting data and binding with region
    axios
      .get(`${url}/api/cities`)
      .then(response => {
        this.setState({ cities: response.data.data });
      })
      .catch(error => {
        notyf.error(error.data.message);
      });

    //User Profile Info
    if (Object.keys(this.state.userInfo).length === 0) {
      console.log('it works')
    axios
      .get(`${url}/api/user/info`)
      .then(response => {
        this.setState({ userInfo: response.data.data });
        // this.setUserInfo(response.data.data)
        this.props.setUserInfo(response.data.data)
      })
      .catch(error => {
        notyf.error(error.data.message);
      });

    this.setState({
      isLoading: false
    });
  }
    
  }

  Logout = e => {
    const cookie = new Cookies();
    const notyf = new Notyf();
    axios
      .get(`${url}/api/auth/logout`)
      .then(response => {
        cookie.remove("access_token", { path: "/" });
        cookie.remove("refresh_token", { path: "/" });
        cookie.remove("user_id", { path: "/" });
        cookie.remove("user_key", { path: "/" });
        notyf.success("Вы вышли из своего аккаунта");
        this.props.removeUserInfo()
        setTimeout(() => {
          Router.push({
            pathname: `/`
          });
        }, 100);
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
        notyf.error(error.data.message);
      });
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
      opened,
      userInfo,
      first_name,
      last_name,
      password,
      password_confirmation,
      old_password,
      myOrders,
      isShowAdressForm,
      image
    } = this.state;

    let title = "";
    if (isShowAdressForm) {
      title = "Отменить Добавление";
    } else {
      title = "Добавить Адрес";
    }
    

    return (
      <>
        <main id="content" role="main">
          <div className="bg-gray-13 bg-md-transparent">
            <div className="container">
              <div className="my-md-3">
              {/* <button onClick={() => console.log(this.state.userInfo)}>props</button> */}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-3 flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble">
                    <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                    <a>Главная</a>
                    </li>
                    <li className="breadcrumb-item flex-shrink-0 flex-xl-shrink-1">
                      <a href="shop.html">Профиль</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="mb-xl-14 mb-6">
              <div className="row">
                <div className="col-md-3 ">
                  {userInfo.image ? (
                    <img
                      style={{ width: "100%" }}
                      src={userInfo.image.url}
                      alt="Профиль"
                    />
                  ) : (
                    <img
                      style={{ width: "100%" }}
                      src="/static/assets/img/profile_img.png"
                      alt=""
                    />
                  )}
                </div>
                <div className="col-md-7 mb-md-6 mb-lg-0">
                  <div className="mb-2 mt-6">
                    <div className="product_name mb-2">
                    <span style={{fontSize:'18px'}}> <b>{userInfo.first_name} {userInfo.last_name}</b> </span>  
                    </div>

                    <div className="product_text">
                    <span style={{fontSize:'18px'}}> <b>  <p>Телефон: +{userInfo.phone}</p></b> </span>
                    
                    </div>
                    <div className="product_text">
                    <span style={{fontSize:'18px'}}> <b>  <p>ID пользователя: {userInfo.id}</p></b> </span>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Tabs
                selectedTabClassName="nav-link active"
                className="position-relative position-md-static px-md-6"
              >
                <TabList className="nav nav-classic nav-tab nav-tab-lg justify-content-xl-center flex-nowrap flex-xl-wrap overflow-auto overflow-xl-visble border-0 pb-1 pb-xl-0 mb-n1 mb-xl-0">
                  <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                    <a className="nav-link ">Мои заказы</a>
                  </Tab>
                  <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                    <a className="nav-link">Мои адреса</a>
                  </Tab>
                  <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                    <a className="nav-link">Настройки</a>
                  </Tab>
                  <Tab className="nav-item flex-shrink-0 flex-xl-shrink-1 z-index-2">
                    <a className="nav-link">Выйти</a>
                  </Tab>
                </TabList>

                <div className="borders-radius-17 border p-4 mt-4 mt-md-0 px-lg-10 py-lg-9">
                  <TabPanel className="tab-content active show">
                    <h3 className="font-size-18 mb-4">История заказов</h3>
                    <div className="table-responsive">
                      {myOrders && myOrders.length ? (
                        <div id="demo">
                          <div className="table-responsive-vertical shadow-z-1">
                            <Table
                              id="table"
                              className="table table-hover table-mc-light-blue"
                            >
                              <Thead>
                                <Tr>
                                  <Th>№</Th>
                                  <Th>Дата</Th>
                                  <Th>Статус</Th>
                                  <Th>Итого</Th>
                                  <Th>Доставка</Th>
                                  <Th>Оплата</Th>
                                  <Th>Действие</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {myOrders && myOrders.length
                                  ? myOrders.map(order => (
                                      <Tr>
                                        <Td data-title="ID">{order.id}</Td>
                                        <Td data-title="Name">
                                          {order.created_at}
                                        </Td>
                                        <Td data-title="Status">
                                          {order.state.name}
                                        </Td>
                                        <Td data-title="Link">
                                          {order.total
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              " "
                                            )}{" "}
                                          сум
                                        </Td>
                                        <Td data-title="Link">
                                          {order.delivery.name}
                                        </Td>
                                        <Td data-title="Link">
                                          {order.payment.name}
                                        </Td>
                                        <Td>
                                          <div className="demo">
                                            <OrderLink id={order.id} />
                                          </div>
                                        </Td>
                                      </Tr>
                                    ))
                                  : null}
                              </Tbody>
                            </Table>
                          </div>
                        </div>
                      ) : (
                        <p>У вас нету заказов</p>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel>
               
                    <div className="ux-text">
                      <div className="row">
                        <div className="col-md-9">
                        <h3 className="font-size-18 mb-4">Мои адреса</h3>
                        </div>
                        <div className="col-md-3">
                          <button
                            onClick={this.toggleBox}
                            className="btn btn-primary-dark-w px-5"
                          >
                            {title}
                          </button>
                        </div>
                      </div>

                      {!isShowAdressForm ? <MyAdresses /> : null}

                      {isShowAdressForm ? (
                        <div className="newsletter_content clearfix">
                          <form
                            onSubmit={this.AdressForm}
                            action="#"
                            className="newsletter_form"
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                    Назовите адрес
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Введите наименование"
                                    onChange={this.handleChange}
                                    value={name}
                                    name="name"
                                    aria-label=""
                                    required=""
                                    data-msg="Please enter your frist name."
                                    data-error-className="u-has-error"
                                    data-success-className="u-has-success"
                                    autocomplete="off"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                    Имя получателя
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Введите ФИО получателя"
                                    onChange={this.handleChange}
                                    name="fio"
                                    value={fio}
                                    placeholder=""
                                    aria-label=""
                                    required=""
                                    data-msg="Please enter your frist name."
                                    data-error-className="u-has-error"
                                    data-success-className="u-has-success"
                                    autocomplete="off"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                    Номер телефона получателя
                                  </label>
                                  <InputMask
                                    mask="+999 99 999 99 99"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    placeholder=""
                                    className="form-control"
                                    id="phone"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="w-100"></div>

                              <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                    Город
                                    <span className="text-danger">*</span>
                                  </label>
                                  {cities ? (
                                    <select
                                      onChange={this.GetRegion}
                                      className="form-control js-select selectpicker dropdown-select pointer  right-dropdown-0 px-2 px-xl-0 btn-sm bg-white font-weight-normal py-2 border text-gray-20 bg-lg-down-transparent border-lg-down-0"
                                      required
                                      value={this.state.cityID}
                                    >
                                      <option value="Выберите Область">
                                        Выберите Область
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
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                    Регион
                                    <span className="text-danger">*</span>
                                  </label>

                                  <select
                                    onChange={this.handleChange}
                                    value={regionID}
                                    name="regionID"
                                    className="form-control js-select selectpicker dropdown-select pointer  right-dropdown-0  btn-sm bg-white font-weight-normal  border text-gray-20 bg-lg-down-transparent border-lg-down-0"
                                    required
                                  >
                                    <option value="Выберите Город">
                                      Выберите Город
                                    </option>
                                    {regions
                                      ? regions.map(region => (
                                          <option
                                            key={region.id}
                                            value={region.id}
                                          >
                                            {region.name}
                                          </option>
                                        ))
                                      : null}
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                    Адрес
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    name="adress"
                                    value={adress}
                                    placeholder=""
                                    required=""
                                  />
                                </div>
                              </div>

                              <div className="w-100"></div>
                            </div>

                            <button type="submit"  className="btn btn-primary-dark-w px-5">
                              Сохранить
                            </button>
                          </form>
                        </div>
                      ) : null}
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="ux-text">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12 ">
                            <div className="contact_form_container">
                              <h3>Персональные данные:</h3>
                              <form action="#" id="contact_form">
                                <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                                  <form
                                    className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between"
                                    onSubmit={this.UpdateUserInfo}
                                  >
                                       <div className="row">
                                  <div className="col-md-12">
                                      <div className="js-form-message mb-6">
                                      <div className="row">
                                      <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                        Имя
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    value={first_name}
                                    onChange={this.handleChange}
                                    placeholder={userInfo.first_name}
                                    required=""
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                 Фамилия
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    value={last_name}
                                    onChange={this.handleChange}
                                    placeholder={userInfo.last_name}
                                    required=""
                                  />
                                </div>
                              </div>

                          

                              <div className="demo">
                                      <input
                                      className="profile_input-photo"
                                        type="file"
                                        onChange={this.changeImageHandler}
                                      ></input>

                                      <button  className="btn btn-primary-dark-w px-5">
                                        Сохранить
                                      </button>
                                    </div>

                                       </div>
                                    </div>
                                 </div>
                               </div>
                           
                                
                                
                                  </form>
                                </div>
                                <h3>Смена пароля:</h3>

                             
                                <form onSubmit={this.UpdateUserPassword}>
                                <div className="row">
                                  <div className="col-md-12">
                                      <div className="js-form-message mb-6">
                                
                                      <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                  Старый пароль
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Старый пароль"
                                          
                                         
                                          onChange={this.handleChange}
                                          value={old_password}
                                          name="old_password"
                                    required=""
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                  Новый пароль
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Новый пароль"
                                          
                                         
                                          onChange={this.handleChange}
                                          value={password}
                                          name="password"
                                    required=""
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="js-form-message mb-6">
                                  <label className="form-label">
                                 Подтвердите пароль
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Подтвердите пароль"
                                          
                                         
                                          onChange={this.handleChange}
                                          value={password_confirmation}
                                          name="password_confirmation"
                                    required=""
                                  />
                                </div>
                              </div>

                             


                                       </div>
                                 </div>
                               </div>
                                  <div className="contact_form_button">
                                    <button
                                      type="submit"
                                      className="btn btn-primary-dark-w px-5"
                                    >
                                      Сохранить
                                    </button>
                                  </div>
                                </form>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div className="contact_form_button">
                      <div className="col-md-12">
                        <h4>Вы уверены что хотите выйти из своего аккаунта?</h4>
                      </div>
                      <div className="col-md-6">
                        <button
                          onClick={this.Logout}
                          type="submit"
                          className="btn btn-primary-dark-w px-5"
                        >
                          Выйти
                        </button>
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = ({userInfo}) => {
  return userInfo
} 
const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (userInfo) => dispatch(fetchSetUserInfo(userInfo)),
    removeUserInfo: () => dispatch(removeUserInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)