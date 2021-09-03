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
class Search extends React.Component {
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

      <div className="col d-none d-xl-block">
      <form                 autoComplete="off"
                onSubmit={this.FormSearch} className="js-focus-state">
        <label className="sr-only" htmlFor="searchproduct">
          Поиск
        </label>
        <div className="input-group">
          <input
          className="form-control py-2 pl-5 font-size-15 border-right-0 height-40 border-width-2 rounded-left-pill border-primary"
            autoComplete="off"
            type="text"
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
            <button
              className="btn btn-primary height-40 py-2 px-3 rounded-right-pill"
              type="button"
              id="searchProduct1"
            >
              <span className="ec ec-search font-size-24"></span>
            </button>
          </div>
        </div>
      </form>
    </div>
      // <div className="col-lg-5 col-12 order-lg-2 order-3 text-lg-left text-right">
      //   <div className="header_search">
      //     <div className="header_search_content">
      //       <div className="header_search_form_container">
      //         <form
      //           autoComplete="off"
      //           onSubmit={this.FormSearch}
      //           className="header_search_form clearfix"
      //         >
      //           <input
                  // autoComplete="off"
                  // type="text"
                  // onChange={this.handleSearchChange}
                  // name="searching"
                  // value={this.state.searching}
                  // list="searchproducts"
                  // required="required"
                  // className="header_search_input"
                  // placeholder="Поиск продуктов..."
                  // onClick={this.handleChange}
      //           />
      //           {this.state.isShow ? (
      //             <div className="datalist">{displayList}</div>
      //           ) : null}

      //           <button
      //             type="submit"
      //             className="header_search_button trans_300"
      //           >
      //             <img
      //               src="/static/assets/template/avtech/images/search.png"
      //               alt="search"
      //             />
      //           </button>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
export default onClickOutside(Search)