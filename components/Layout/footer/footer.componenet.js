import React from "react";
import axios from "axios";
import "../../../plugins/axios";
import Link from "next/link";
import Chat from "../../Chat/chat"
import url from "../../url";
import { connect } from "react-redux";

const PopularLink = props => (
  <Link
    href={{
      pathname: "/shop/[id]",
    }}
    as={`/shop/${props.slug}`}
  >
    <li>
      {" "}
      <a>{props.name}</a>
    </li>
  </Link>
);

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios
      .get(`${url}/api/home`, {
        params: {
          type: "popular_categories"
        }
      })
      .then(response => {
        this.setState({ categories: response.data.data.categories });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    return (
      <footer>
        <Chat />
            <div className="pt-8 pb-4 bg-gray-13">
                <div className="container mt-1">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="mb-6">
                                <a href="#" className="d-inline-block">
                                   <img style={{width:'30%'}} src="/static/assets/img/75X75/logo-footer.jpg" />
                                </a>
                            </div>
                            <div className="mb-4">
                                <div className="row no-gutters">
                                    <div className="col-auto">
                                        <i className="ec ec-support text-primary font-size-56"></i>
                                    </div>
                                    <div className="col pl-3">
                                        <div className="font-size-13 font-weight-light">У вас есть вопросы? Звоните!</div>
                                        <a href="tel:+998972410241" className="font-size-20 text-gray-90">(71) 241 02 41, </a><a href="tel:+998998027400" className="font-size-20 text-gray-90">(99) 802 74 00</a>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h6 className="mb-1 font-weight-bold">Адрес</h6>
                                <address className="">
                                город Ташкент, Шайхантахурский район, ул. Абая 13А.
                                </address>
                            </div>
                            <div className="my-4 my-md-4">
                                <ul className="list-inline mb-0 opacity-7">
                                    <li className="list-inline-item mr-0">
                                        <a href="https://www.facebook.com/kitmachpremiumuz" className="btn font-size-20 btn-icon btn-soft-dark btn-bg-transparent rounded-circle">
                                            <span className="fab fa-facebook-f btn-icon__inner"></span>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mr-0">
                                        <a href="https://www.instagram.com/kitmachpremiumuz/" className="btn font-size-20 btn-icon btn-soft-dark btn-bg-transparent rounded-circle">
                                            <span className="fab fa-instagram btn-icon__inner"></span>
                                        </a>
                                    </li>
                                    <li className="list-inline-item mr-0">
                                        <a href="https://t.me/kitmachgroup" className="btn font-size-20 btn-icon btn-soft-dark btn-bg-transparent rounded-circle">
                                            <span className="fab fa-telegram btn-icon__inner"></span>
                                        </a>
                                    </li>
                            
                                   
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-12 col-md mb-4 mb-md-0">
                                    <h6 className="mb-3 font-weight-bold">Категории</h6>
                                   
                                    <ul className="list-group list-group-flush list-group-borderless mb-0 list-group-transparent">
                                    {this.state.categories ? this.state.categories.map(category => {if (category.name !== "Хлебопекарное оборудование") { return ( 
                                      <Link key={category.id}
                                      href={{
                                        pathname: "/shop/[id]",
                                        query: { category_id: category.id }
                                      }}
                                      as={`/shop/${category.slug}`}
                                    ><li><a className="list-group-item list-group-item-action">{category.name}</a></li></Link>)}} ) : null}
                                      
                                    </ul>
                                    
                                </div>

  

                                <div className="col-12 col-md mb-4 mb-md-0">
                                    <h6 className="mb-3 font-weight-bold">Навигация </h6>
                                
                                    <ul className="list-group list-group-flush list-group-borderless mb-0 list-group-transparent">

                                        <li><Link href={this.props.user.user.id ? '/user' : '/login'}><a className="list-group-item list-group-item-action">Мой аккаунт</a></Link></li>
                                        <li><Link href="/track-your-order"><a className="list-group-item list-group-item-action" >Следить за заказом</a></Link></li>
                                        <li><Link href="/wishlist"><a className="list-group-item list-group-item-action" >Избранные</a></Link></li>
                                        <li><Link href="/terms-and-conditions"><a className="list-group-item list-group-item-action" >Сервис</a></Link></li>
                                        <li><Link href={'/checkout'}><a className="list-group-item list-group-item-action">Доставка и оплата</a></Link></li>
                                        <li><Link href="/faq"><a className="list-group-item list-group-item-action" >Чаво</a></Link></li>
                                        <li><Link href="/terms-and-conditions"><a className="list-group-item list-group-item-action" >Возврат/обмен</a></Link></li>
                                    </ul>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
            <div className="bg-gray-14 py-2">
                <div className="container">
                    <div className="flex-center-between d-block d-md-flex">
                        <div className="mb-3 mb-md-0">© <a href="#" className="font-weight-bold text-gray-90">Разработано </a> - InCore Solutions</div>
                      
                    </div>
                </div>
            </div>
         
        </footer>
    );
  }
}

const mapStateToProps = ({userInfo}) => {
  return {
    user: userInfo
  }
}

export default connect(mapStateToProps, null)(Footer);