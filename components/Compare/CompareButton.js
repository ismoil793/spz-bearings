import React from "react";
import "../../plugins/axios";
import axios from "axios";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

import Cookies from "universal-cookie";
import url from "../url";
import { connect } from "react-redux";
import { fetchCompare } from "../../redux/actions/compare";

class CompareButton extends React.Component {
  constructor() {
    super();
    this.state = {
          toggle: false 
    }
  }

  notify = (id,text) => {
    if (! toast.isActive(id)) {
      id = toast(text);
    }

    toast("xxx-yyy cannot be duplicated", {
      toastId: id
    });
  }

  AddCompare = () => {
    const notyf = new Notyf();
    let toastID = this.props.favouriteID
    const cookies = new Cookies();
    axios({
      method: "post",
      url: `${url}/api/comparison/toggle`,
      data: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        product_id: this.props.product_id
      }
    })
      .then(response => {
        this.setState(prevState => ({
          toggle: !prevState.toggle
        }));
        if(this.state.toggle == true){ 
          notyf.success(`${this.props.product_name} в Сравнении`)
          // this.props.handleCompare()
        }else{
          notyf.error(`${this.props.product_name} удален со Сравнений`);
        }
        this.props.getCompare();
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {

    return (
      <>
      {!this.state.toggle ? (
          <a onClick={this.AddCompare}  className="text-gray-6 pointer font-size-13"><i className="ec ec-compare mr-1 font-size-15"></i> Сравнить</a>
        ) : (
          <a onClick={this.AddCompare}  className="text-success pointer font-size-13"><i className="ec ec-compare mr-1 font-size-15"></i> В сравнении</a>
        )}
     
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompare: () => dispatch(fetchCompare())
  }
}

export default connect(null, mapDispatchToProps)(CompareButton)
