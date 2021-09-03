import React from "react";
import axios from "axios";
import Link from "next/link";
import url from "../url";

class AsideChild extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      isChild: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      isChild: !prevState.isChild
    }));
  };

  render() {

    console.log('this.props.category')
   
    return (
      <li className="u-has-submenu u-header-collapse__submenu">
        { this.props.category.childs.length !== 0 ?
          <>
        <a
          onClick={this.toggle}
          className="u-header-collapse__nav-link u-header-collapse__nav-pointer"
        >
          {this.props.category.name}
        </a>

        <div
          id="headerSidebarComputersCollapse"
          className={this.state.isChild ? "show_aside" : "collapse"}
          data-parent="#headerSidebarContent"
        >
          {typeof this.props.category.childs == "object" ? (
            <ul className="u-header-collapse__nav-list">
              {this.props.category.childs.map((childcategory, k) => (
                <li key={k} className="">
                  {" "}
                  <Link
                          href={{
                            pathname: "/shop/[id]",
                            query: { category_id: childcategory.id }
                          }}
                          as={`/shop/${childcategory.slug}`}
                        >
                    <a className="u-header-collapse__submenu-nav-link">
                      {childcategory.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null} 
        </div>
        </> 
        : <Link href={{
                pathname: "/shop/[id]",
                query: { category_id: this.props.category.id }
                }}
                as={`/shop/${this.props.category.slug}`}>
                  <a
                    onClick={this.toggle}
                    className="navlink_without-collapse"
                  >
                    {this.props.category.name}
                  </a>
          </Link>}
      </li>
    );
  }
}
export default AsideChild;
