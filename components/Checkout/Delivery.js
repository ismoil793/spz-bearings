import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";
import Cookies from "universal-cookie";
import InputMask from "react-input-mask";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import url from "../url";
export default class Delivery extends React.Component {
  constructor() {
    super();
    this.state = {
      addresses: [],
      deliveries: [],
      cities: [],
      regions: [],
      phone: "",
      full_name: "",
      adress: "",
      regionID: "",
      deliveryID: "",
      phoneNumber: "",
      code: "",
      addressID: "",
      cityID: null

    };
  }

  // ***************      *************** //

  sendData = e => {
    setTimeout(() => {
      this.props.parentCallback(this.state);
    }, 300);
  };

  async componentDidMount() {
    // ***************   Fetching Deliveries from Back-end   *************** //
    await axios
      .get(`${url}/api/order/deliveries`)
      .then(response => {
        this.setState({ deliveries: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    // ***************   Fetching Cities from Back-end   *************** //

    await axios
      .get(`${url}/api/cities`)
      .then(response => {
        this.setState({ cities: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });

    // ***************   Fetching Adresses of LoggedIn User from Back-end   *************** //

    await axios
      .get(`${url}/api/user/address`)
      .then(response => {
        this.setState({ addresses: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  SingleAddress = () => {
    if (this.state.addressID) {
      axios
        .get(`${url}/api/user/address`, {
          params: {
            address_id: this.state.addressID
          }
        })
        .then(response => {
          this.setState({
            phone: response.data.data.phone,
            full_name: response.data.data.full_name,
            adress: response.data.data.address,
            regionID: response.data.data.region.id,
            cityID: response.data.data.region.city.id
          }, () => {
            this.props.parentCallback(this.state);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.SingleAddress(),
      this.Region()
    );

    this.sendData();
  };

  // ***************   Phone Verification for unauthentificated User   *************** //

  PhoneSend = e => {
    const notyf = new Notyf();
    e.preventDefault();
    const { phoneNumber } = this.state;
    axios({
      method: "post",
      url: `${url}/api/auth/code/update`,
      data: {
        phone: phoneNumber.replace(/\s/g, "").replace("+", "")
      }
    })
      .then(response => {
        notyf.success("Пароль был отправлен");
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  // ***************  Code Verification for unauthentificated User   *************** //

  CodeSend = e => {
    e.preventDefault();
    const notyf = new Notyf();
    const { phoneNumber, code } = this.state;
    const cookies = new Cookies();
    axios({
      method: "post",
      url: `${url}/api/auth/verify`,
      data: {
        phone: phoneNumber.replace(/\s/g, "").replace("+", ""),
        code: code
      }
    })
      .then(response => {
        notyf.success("Вы успешно прошли проверку");
        cookies.set("user_key", response.data.key);
        cookies.set("user_id", response.data.id);
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  // ***************   After City select call the Regions of chosen city    *************** //



 Region = e => {
    // e.preventDefault();

    let regionId = this.state.cityID

    axios
      .get(`${url}/api/regions`, {
        params: {
          city_id: regionId
        }
      })
      .then(response => {
        this.setState({ regions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  GetRegion = e => {
    e.preventDefault();

    let regionId =  e.target.value;

    axios
      .get(`${url}/api/regions`, {
        params: {
          city_id: regionId
        }
      })
      .then(response => {
        this.setState({ regions: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // ***************  Select Delivery Method radio buttons    *************** //

  onSiteChanged = e => {
    this.setState({
      deliveryID: e.target.value
    });
    this.sendData();
  };

  // ***************  Adress form to fill the all user to show address of delivery   *************** //

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
      })
      .catch(error => {
        notyf.error(error.data.message);
      });
  };

  // ***************   Render of JSX begins  *************** //

  render() {
    const {
      deliveries,
      cities,
      regions,
      phone,
      full_name,
      adress,
      deliveryID,
      regionID,
      phoneNumber,
      code,
      addresses,
      addressID
    } = this.state;
   

    const cookies = new Cookies();
    return (
      <div className="columns account-header">
        <div className="column is-10 is-offset-1 checkout-wrapper is-tablet-landscape-padded">
          <div className="checkout-title">
            <h2>Детали оплаты</h2>
          </div>
          <div className="flat-card is-auto is-checkout-form has-overflow">
            <div className="columns is-gapless is-vcentered">
              <div className="column is-5 has-text-centered grey-column ">
                <div className="shipping-wrapper">
                  <div className="columns is-multiline is-gapless">
                    {deliveries
                      ? deliveries.map(deliver => (
                          <div key={deliver.id} className="column is-12">
                            <label>
                              <input
                                value={deliver.id}
                                checked={this.state.deliveryID == deliver.id}
                                onChange={this.onSiteChanged}
                                type="radio"
                                name="radio66"
                                id="sad"
                              />
                              <div
                                className={
                                  this.state.deliveryID == deliver.id
                                    ? "mini-card checked"
                                    : "mini-card "
                                }
                              >
                                <img
                                  style={{ width: "15%" }}
                                  src={`/static/assets/template/avtech/images/money/${deliver.id}.png`}
                                  alt={deliver.name}
                                />

                                <div className="state p-info-o">
                                  <div className="shipping-method">
                                    {deliver.name}
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>

              {deliveryID == 1 ? (
                <div className="column is-7 is-padded">
                  <p>Самовывоз выбран</p>
                </div>
              ) : (
                <div className="column is-7 is-padded">
                  <form className="shipping-address-form">
                    <div className="columns is-multiline">
                      {!cookies.get("access_token") ? (
                        <>
                          <form
                            className="column is-12 columns is-multiline"
                            onSubmit={this.PhoneSend}
                          >
                            <div className="col-md-12">
                              <p style={{ color: "#F12322" }}>
                                Пройдите авторизацию, чтобы продолжить покупку
                              </p>
                            </div>
                            <div className="col-md-6">
                              <div className="control">
                                <label className="checkout-label">
                                  Введите номер
                                </label>
                                <InputMask
                                  mask="+999 99 999 99 99"
                                  onChange={this.handleChange}
                                  name="phoneNumber"
                                  value={phoneNumber}
                                  placeholder="Номер телефона"
                                  className="phone"
                                  id="phone"
                                  required
                                  className="input"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="control">
                                <label className="checkout-label"></label>
                                <button type="submit" className="button_phone">
                                  <span>Получить код</span>
                                </button>
                              </div>
                            </div>
                          </form>

                          <form
                            className="column is-12 columns is-multiline"
                            onSubmit={this.CodeSend}
                          >
                            <div className="col-md-6">
                              <div className="control">
                                <label className="checkout-label">Код</label>
                                <input
                                  type="text"
                                  className="input"
                                  placeholder=""
                                  onChange={this.handleChange}
                                  name="code"
                                  value={code}
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="control">
                                <label className="checkout-label"></label>
                                <button type="submit" className="button_code">
                                  <span>Подтверждение</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </>
                      ) : null}

                      <form className="column is-12 columns is-multiline">
                        {cookies.get("access_token") ? (
                          <div className="col-md-12">
                            <div className="col-md-12">
                              <p style={{ color: "#F12322" }}>
                                Информация о адресе доставки
                              </p>
                            </div>
                            <div className="control">
                              {addresses && addresses.length? (
                                <select
                                  value={addressID}
                                  name="addressID"
                                  onChange={this.handleChange}
                                  className="input"
                                >
                                  <option value="0">
                                    Выберите Адрес доставки
                                  </option>
                                  {addresses.map(adres => (
                                    <option key={adres.id} value={adres.id}>
                                      {adres.name
                                        ? adres.name
                                        : `Адрес (${adres.address})`}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <h5>
                                  У вас нету адресов, заполните нижеуказанные
                                  поля
                                </h5>
                              )}
                            </div>
                          </div>
                        ) : null}
                        <div className="col-md-12">
                          <p style={{ color: "#F12322" }}>
                            Укажите новый адрес
                          </p>
                        </div>
                        <div className="col-md-6">
                          <div className="control">
                            <label className="checkout-label">
                              Имя получателя
                            </label>
                            <input
                              type="text"
                              className="input"
                              placeholder=""
                              onChange={this.handleChange}
                              name="full_name"
                              value={full_name}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="checkout-label">Область</label>

                          <div className="control">
                            {cities ? (
                              <select
                                onChange={this.GetRegion}
                                className="input"
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
                          <div className="control">
                            <label className="checkout-label">
                              Телефон получателя
                            </label>
                            <InputMask
                                  mask="+999 99 999 99 99"
                                  placeholder="Номер телефона"
                                  type="text"
                                  className="input"
                                  onChange={this.handleChange}
                                  name="phone"
                                  value={phone}
                                  required
                                />
                        
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="checkout-label">Город</label>

                          <div className="control">
                            <select
                              onChange={this.handleChange}
                              value={regionID}
                              name="regionID"
                              className="input"
                              required
                            >
                              <option value="Выберите Город">
                                Выберите Город
                              </option>
                              {regions
                                ? regions.map(region => (
                                    <option key={region.id} value={region.id} >
                                      {region.name}
                                    </option>
                                  ))
                                : null}
                            </select>
                          </div>
                        </div>

                        <div className="column is-12">
                          <div className="control">
                            <label className="checkout-label">Адрес</label>
                            <input
                              type="text"
                              className="input"
                              placeholder=""
                              onChange={this.handleChange}
                              name="adress"
                              value={adress}
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
