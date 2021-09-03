import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../../plugins/axios";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Cookies from "universal-cookie";
import url from "../url";
import { connect } from "react-redux";
import { fetchCompare } from "../../redux/actions/compare";

class DeleteCompare extends React.Component {
  constructor(props) {
    super(props);
  }

  DeleteCompare = () => {
    const cookies = new Cookies();
    const notyf = new Notyf();
    axios({
      method: "post",
      url: `${url}/api/comparison/toggle`,
      data: {
        device_token: cookies.get("device_token"),
        device_type: cookies.get("device_type"),
        product_id: this.props.ID
      }
    })
      .then(response => {
        notyf.error("Товар удален со Сравнений");
        this.props.onDelete();
        this.props.getCompare()
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <a onClick={this.DeleteCompare} href="#" class="text-gray-90">
        <i class="fa fa-times"></i>
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompare: () => dispatch(fetchCompare())
  }
}

export default connect(null, mapDispatchToProps)(DeleteCompare)