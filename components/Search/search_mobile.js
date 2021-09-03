import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "../../plugins/axios";
import Router from "next/router";
import onClickOutside from "react-onclickoutside";
import url from "../url";

const SearchProductLink = props => (
  <>
    <Link
      href={{
        pathname: "/productPage/[productCard]"
      }}
      as={`/productPage/${props.slug}`}
    >
      <option key={props.productID}>
        {" "}
        <a href="#"> {props.id}</a>{" "}
      </option>
    </Link>
  </>
);
class SearchMobile extends React.Component {
  constructor() {
    super();

    this.state = {
      searching: "",
      isShow: false,
      products: [],
      productlist: []
    };
  }

  handleClickOutside = evt => {
 this.setState({
   searching: '',
  isShow: false
 })
  };

  Search = () => {
    axios
      .get(`${url}/api/search`, {
        params: {
          search: this.state.searching
        }
      })
      .then(response => {
        //   this.setState({ searched: response.data.products });
        let products = [];
        if (response.data.products.length) {
          for (let i = 0; i < response.data.products.length; i++) {
            
            products.push({
              id: response.data.products[i].id,
              value: response.data.products[i].name,
              image: response.data.products[i].image,
              slug: response.data.products[i].slug
            });
          }
        }
        setTimeout(() => {
          this.setState({
            products: products,
            isShow: true,
            productlist: response.data.products
          });
        }, 100);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSearchChange = e => {
    this.setState({ searching: e.target.value }, () => {
      this.Search();
    });
  };

  handleClick(option) {
    Router.push({
      pathname: `/product/${option.slug}`
    });
    this.setState({ searching: option.value, isShow: false });
  }

  FormSearch = e => {
    e.preventDefault();
    Router.push({
      pathname: `/search`,
      query: { searching: this.state.searching }
    });
    this.setState({ searching: this.state.searching, isShow: false });
  };

  render() {
    const { searched, searching, search_id, products } = this.state;
    let displayList = this.state.products.map(option => {
      return (
        <div
        key={option.id}
          className="dataoption"
          data-id={option.id}
          onClick={() => this.handleClick(option)}
        >
          <div className="dataimage">
            <img src={option.image} alt={option.value} />{" "}
          </div>
          <div className="datatext">{option.value} </div>
        </div>
      );
    });
    return (
           <div id="searchClassic" className="dropdown-menu dropdown-unfold dropdown-menu-right left-0 mx-2 u-unfold--css-animation slideInUp" aria-labelledby="searchClassicInvoker" style={{animationDuration: '300ms'}}>
                                                <form   onSubmit={this.FormSearch} className="js-focus-state input-group px-3">
                                                    <input  autoComplete="off"className="form-control" type="search"
                                                                onChange={this.handleSearchChange}
                                                                name="searching"
                                                                value={this.state.searching}
                                                                list="searchproducts"
                                                                required="required"
                                                                placeholder="Поиск продуктов..."
                                                                onClick={this.handleChange}
                                                    />
                                                              {this.state.isShow ? (
                                                                <div className="datalist">{displayList}</div>
                                                                ) : null}
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary px-3" type="button"><i className="font-size-18 ec ec-search"></i></button>
                                                    </div>
                                                </form>
          </div>
   );
  }
}
export default onClickOutside(SearchMobile)