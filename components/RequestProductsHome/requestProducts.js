import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'
import axios from 'axios'
import ButtonCart from '../ButtonCarts/CartButton'
import url from '../url';

// const ProductLink = props => (
//     <li>
//       <Link href="/productPage/[productCard]" as={`/productPage/${props.id}`}>
//         <a>{props.id}</a>
//       </Link>
//     </li>
//   );

export default class RequestProducts extends React.Component {

constructor(){
    super()
   
    this.state = {
       newproduct:[],
       discountproduct:[],
       popularproduct:[]
    }
}



async componentDidMount(){
    setTimeout(() => {
        this.requestProduct();
       },3000)
      

}

async requestProduct(){

await axios.get(`${url}/api/home`, {
    params: {
       group: "product_request",
       type: "new"
      }
}).then(response => {
this.setState({newproduct: response.data.data})

}).catch(error => {
    console.log(error);
  })



  axios.get(`${url}/api/home`, {
    params: {
       group: "product_request",
       type: "discount"
      }
}).then(response => {
this.setState({discountproduct: response.data.data})

}).catch(error => {
    console.log(error);
  })




  axios.get(`${url}/api/home`, {
    params: {
       group: "product_request",
       type: "popular_products"
      }
}).then(response => {
this.setState({popularproduct: response.data.data})

}).catch(error => {
    console.log(error);
  })
}
    render() { 
        const {newproduct, popularproduct, discountproduct} = this.state
  
       
        return (
            <div className="col-md-4">
            <div className="featured">
            <div className="tabbed_container">
                <div className="tabs">
                    <ul className="clearfix">
                        <li className="active">Новинки</li>
                        <li>Скидки</li>
                        <li>Популярные</li>
                    </ul>
                    <div className="tabs_line"><span></span></div>
                </div>

            
                <div className="product_panel panel active">
                    <div className="featured_slider slider">
                    {newproduct
                      ?  (
                         <div key={newproduct.id} className="featured_slider_item">
                            <div className="border_active"></div>
                           {  (typeof(newproduct.product_request) == 'object') ?
                            (
                                newproduct.product_request.map((request) =>
                            <div key={request.id} className="product_item discount d-flex flex-column align-items-center justify-content-center text-center">
                               
                                <div className="product_image d-flex flex-column align-items-center justify-content-center">
                                <img src={request.images[0].types.small_default} alt=""/>
                                </div>
                              
                                <div className="product_content">
                                    <div className="product_price discount">{request.random_shop.price} cум</div>
                                    <div className="product_name">
                                        <div><a href="product.html">{request.name}</a></div>
                                    </div>
                                    <ButtonCart />
                                </div>
                                <div className="product_fav"><i className="fas fa-heart"></i></div>
                                <ul className="product_marks">
                                    <li className="product_mark product_discount">-25%</li>
                                    <li className="product_mark product_new">new</li>
                                </ul>
                           
                            </div> )): null}
                        </div>) : null }
                    </div>
                    <div className="featured_slider_dots_cover"></div>
                </div>

            

                <div className="product_panel panel">
                    <div className="featured_slider slider">

                        
                    {discountproduct
                      ?  (
                         <div key={discountproduct.id} className="featured_slider_item">
                            <div className="border_active"></div>
                           {  (typeof(discountproduct.product_request) == 'object') ?
                            (
                               discountproduct.product_request.map((request) =>
                            <div key={request.id} className="product_item discount d-flex flex-column align-items-center justify-content-center text-center">
                               
                            
                                <div className="product_image d-flex flex-column align-items-center justify-content-center">
                                <img className="images" src={request.images[0].types.medium_default} alt=""/>
                                </div>
                              
                                <div className="product_content">
                                    <div className="product_price discount">{request.random_shop.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} cум</div>
                                    <div className="product_name">
                                        <div><a href="product.html">{request.name}</a></div>
                                    </div>
                                    <ButtonCart />
                                </div>
                                <div className="product_fav"><i className="fas fa-heart"></i></div>
                                <ul className="product_marks">
                                    <li className="product_mark product_discount">-25%</li>
                                    <li className="product_mark product_new">new</li>
                                </ul>
                          
                            </div> )): null}
                      </div>) : null }



                      </div>
                    <div className="featured_slider_dots_cover"></div>
                </div>

            

                <div className="product_panel panel">
                    <div className="featured_slider slider">
                    {popularproduct
                      ?  (
                         <div key={popularproduct.id} className="featured_slider_item">
                            <div className="border_active"></div>
                           {  (typeof(popularproduct.product_request) == 'object') ?
                            (
                                popularproduct.product_request.map((request) =>
                            <div key={request.id} className="product_item discount d-flex flex-column align-items-center justify-content-center text-center">
                               
                                <div className="product_image d-flex flex-column align-items-center justify-content-center">
                                <img className="images" src={request.images[0].types.medium_default} alt=""/>
                                </div>
                              
                                <div className="product_content">
                                    <div className="product_price discount">{request.random_shop.price} cум</div>
                                    <div className="product_name">
                                        <div><a href="product.html">{request.name}</a></div>
                                    </div>
                                      <ButtonCart />
                                </div>
                                <div className="product_fav"><i className="fas fa-heart"></i></div>
                                <ul className="product_marks">
                                    <li className="product_mark product_discount">-25%</li>
                                    <li className="product_mark product_new">new</li>
                                </ul>
                         
                            </div> )): null}
                      </div>) : null }

                    </div>
                    <div className="featured_slider_dots_cover"></div>
                </div>

            </div>
        </div>
    
        </div>
        )
      }
    }