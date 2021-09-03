import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import "../../plugins/axios";
import ButtonProductCartHome from "../ButtonCarts/CartButton";
import AddButtonFavs from "../Favourites/Add_favourites_button";
import CompareButton from "../Compare/CompareButton";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import url from "../url";
import Countdown from "react-countdown";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #000000;
`;

const ProductLink = props => (
  <>
    <Link
      href={{
        pathname: "/productPage/[productCard]"
      }}
      as={`/productPage/${props.slug}`}
    >
      <div className="product_content">
        {props.quantity ? (
          props.discount_price ? (
            <div className="product_price">
             <span>
                {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                сум
              </span>
              {props.discount_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              сум
              <div className="no-nds">
                                  Без учета НДС
                                 </div>
            </div>
          ) : (
            <div className="product_price">
              {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} сум
              <div className="no-nds">
                                  Без учета НДС
                                 </div>
            </div>
          )
        ) : (
          <div className="product_price">Нет в наличии</div>
        )}

        <div className="viewed_name">
          <a className="name">{props.id}</a>
        </div>
      </div>
    </Link>
  </>
);

const ImageLink = props => (
  <>
    <Link
      href={{
        pathname: "/productPage/[productCard]"
      }}
      as={`/productPage/${props.slug}`}
    >
      <img className="images" src={props.image} alt={props.slug} />
    </Link>
  </>
);

// Random component
const Completionist = () => <span>Предложение закончилось</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div class="deals_timer_content ml-auto">
        <div class="deals_timer_box clearfix" data-target-time="">
          {days ? (
            <div class="deals_timer_unit">
              <div id="deals_timer1_days" class="deals_timer_days">
                {days}
              </div>
              <span> дней</span>
            </div>
          ) : null}
          <div class="deals_timer_unit">
            <div id="deals_timer1_hr" class="deals_timer_hr">
              {hours}
            </div>
            <span> часов</span>
          </div>
          <div class="deals_timer_unit">
            <div id="deals_timer1_min" class="deals_timer_min">
              {minutes}
            </div>
            <span> минут</span>
          </div>
          <div class="deals_timer_unit">
            <div id="deals_timer1_sec" class="deals_timer_sec">
              {seconds}
            </div>
            <span> сек</span>
          </div>
        </div>
      </div>
    );
  }
};

export default class Hotproducts extends React.Component {
  handleParent = () => {
    this.props.change();
  };
  handleCompare = () => {
    this.props.compare();
  };

  render() {
    var date = new Date("11/21/1987 16:00:00"); // some mock date
    var milliseconds = date.getTime();
    // This will return you the number of milliseconds
    // elapsed from January 1, 1970
    // if your date is less than that date, the value will be negative

    console.log(milliseconds);
    return (
      <>
        {this.props.hotproducts ? (
          <div className="row">
            <div className="border_active"></div>
            {typeof this.props.hotproducts.product_request == "object"
              ? this.props.hotproducts.product_request.map(request => (
                  <div
                    key={request.id}
                    className={request.random_shop.discount.until ? "product_item col-md-3 deal_products d-flex flex-column align-items-center justify-content-center text-center" : "product_item col-md-3 discount d-flex flex-column align-items-center justify-content-center text-center" }
                  >
                    <div className="product_image d-flex flex-column align-items-center justify-content-center">
                      <ImageLink
                        slug={request.slug}
                        image={request.images[0].types.home_default}
                        productID={request.id}
                      />
                    </div>

                    <div className="product_content">
                      <ProductLink
                        productID={request.id}
                        price={request.random_shop.price}
                        discount_price={
                          request.random_shop.discount
                            ? request.random_shop.discount.price
                            : null
                        }
                        slug={request.slug}
                        id={request.name}
                        quantity={request.random_shop.quantity}
                      />

<div class="deals_timer" id="deal_shop">
                        <div class="deals_timer_title_container">
                          <div class="deals_timer_title">Предложение заканчивается через:</div>
                          <div class="deals_timer_subtitle"></div>
                        </div>

                        <Countdown
                          date={Date.now() +request.random_shop.discount
                            ? new Date(
                              request.random_shop.discount.until
                              ).getTime()
                            : null}
                          daysInHours={true}
                          renderer={renderer}
                        />
                      </div>

                      

                      <ButtonProductCartHome
                        handlechild={this.handleParent}
                        productss_id={request.random_shop.item_shop_id}
                      />
                    </div>
                    <AddButtonFavs favouriteID={request.id} />
                    <CompareButton
                      handleCompare={this.handleCompare}
                      favouriteID={request.id}
                    />
                    {request.random_shop.discount ? (
                      <ul className="product_marks">
                        <li className="product_mark product_discount">
                          -{request.random_shop.discount.percent}%
                        </li>
                        <li className="product_mark product_new">new</li>
                      </ul>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </>
    );
  }
}
