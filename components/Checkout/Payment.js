import React from "react";
import axios from "axios";
import "../../plugins/axios";
import url from "../url";


export default class Payments extends React.Component {
  constructor() {
    super();
    this.state = {
      payments: [],
      paymentID: ""
    };
  }

  sendData = e => {
    setTimeout(() => {
      this.props.parentCallback(this.state);
    }, 300);
  };

  async componentDidMount() {
    await axios
      .get(`${url}/api/order/payments`)
      .then(response => {
        this.setState({ payments: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSiteChanged = e => {

 

    e.preventDefault();
    this.setState({
      paymentID: e.target.value
    }, () => { console.log('what is it: ' +this.state.paymentID);});

   

    this.sendData();
  };

  render() {
    const { payments } = this.state;

    return (
      <div className="columns account-header">
        <div className="column is-10 is-offset-1 checkout-wrapper is-tablet-landscape-padded">
          <div
            id="payment-header"
            className="checkout-title is-centered animated preFadeInUp fadeInUp"
          >
            <h2>Способ оплаты</h2>
            {/* <img className="brand-filigrane is-left" src="#" alt="" /> */}
          </div>

          <div id="payment-methods" className="columns is-multiline">
            {payments
              ? payments.map(pay => (
                  <div key={pay.id} className="column is-3">
                   <label>

                   <input 
                            value={pay.id}
                            checked={this.state.paymentID == pay.id}
                            onChange={this.onSiteChanged}
                            type="radio"
                            id="sad"/>
                    <div className={this.state.paymentID == pay.id ? "flat-card payment-method is-credit-card is-auto checked" : "flat-card payment-method is-credit-card is-auto" }>
                        
                        <img style={{ width: "30%" }} src={`/static/assets/template/avtech/images/money/payment/${pay.id}.png`} alt={pay.name}/>
                        <div className="payment-text">{pay.name}</div>
                    </div>
                    </label>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}


