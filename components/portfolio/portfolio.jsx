import React from "react";
import Link from 'next/link'



export default class Portfolio extends React.Component {
  render() {
    return (
      <>
        <div class="flip-card-container" style={{'--hue': '220'}}>
  <div class="flip-card">

    <div class="card-front">
      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/pr_img1.jpg" alt="services" loading="lazy"/>
        <figcaption>{this.props.homeText[this.props.locale].product_demand.cards[0].title}</figcaption>
      </figure>

      <ul>
      {this.props.homeText[this.props.locale].product_demand.cards[0].details.map(item => (<li>{item}</li>))}
      </ul>
    </div>

    <div class="card-back">
      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/pr_img1.jpg" alt="services" loading="lazy"/>
      </figure>

      <button className="portfolio_order_button"><Link href={`/shop`}><a>{this.props.homeText[this.props.locale].product_demand.button}</a></Link></button>

      <div class="design-container">
        <span class="design design--1"></span>
        <span class="design design--2"></span>
        <span class="design design--3"></span>
        <span class="design design--4"></span>
        <span class="design design--5"></span>
        <span class="design design--6"></span>
        <span class="design design--7"></span>
        <span class="design design--8"></span>
      </div>
    </div>

  </div>
</div>

<div class="flip-card-container" style={{'--hue': '170'}}>
  <div class="flip-card">

    <div class="card-front">
      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/auto.jpg" alt="Image 2" loading="lazy"/>
        <figcaption>{this.props.homeText[this.props.locale].product_demand.cards[1].title}</figcaption>
      </figure>

      <ul>
      {this.props.homeText[this.props.locale].product_demand.cards[1].details.map(item => (<li>{item}</li>))}
      </ul>
    </div>

    <div class="card-back">
      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/auto.jpg" alt="image-2"/>
      </figure>

      <button className="portfolio_order_button"><Link href={`/shop`}><a>{this.props.homeText[this.props.locale].product_demand.button}</a></Link></button>

      <div class="design-container">
        <span class="design design--1"></span>
        <span class="design design--2"></span>
        <span class="design design--3"></span>
        <span class="design design--4"></span>
        <span class="design design--5"></span>
        <span class="design design--6"></span>
        <span class="design design--7"></span>
        <span class="design design--8"></span>
      </div>
    </div>

  </div>
</div>

<div class="flip-card-container" style={{'--hue': '350'}}>
  <div class="flip-card">

    <div class="card-front">
      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/energy.jpg" alt="services" loading="lazy"/>
        <figcaption>{this.props.homeText[this.props.locale].product_demand.cards[2].title}</figcaption>
      </figure>

      <ul>
      {this.props.homeText[this.props.locale].product_demand.cards[2].details.map(item => (<li>{item}</li>))}
      </ul>
    </div>

    <div class="card-back">

      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/energy.jpg" alt="services" loading="lazy"/>
      </figure>

      <button className="portfolio_order_button"><Link href={`/shop`}><a>{this.props.homeText[this.props.locale].product_demand.button}</a></Link></button>


      <div class="design-container">
        <span class="design design--1"></span>
        <span class="design design--2"></span>
        <span class="design design--3"></span>
        <span class="design design--4"></span>
        <span class="design design--5"></span>
        <span class="design design--6"></span>
        <span class="design design--7"></span>
        <span class="design design--8"></span>
      </div>
    </div>

  </div>
</div>

<div class="flip-card-container" style={{'--hue': '350'}}>
  <div class="flip-card">

    <div class="card-front">
      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/pr_img4.jpg" alt="services" loading="lazy"/>
        <figcaption>{this.props.homeText[this.props.locale].product_demand.cards[3].title}</figcaption>
      </figure>

      <ul>
      {this.props.homeText[this.props.locale].product_demand.cards[3].details.map(item => (<li>{item}</li>))}
      </ul>
    </div>

    <div class="card-back">

      <figure>
        <div class="img-bg"></div>
        <img src="/static/assets/img/img/home-14/pr_img4.jpg" alt="services" loading="lazy"/>
      </figure>

      <button className="portfolio_order_button"><Link href={`/shop`}><a>{this.props.homeText[this.props.locale].product_demand.button}</a></Link></button>


      <div class="design-container">
        <span class="design design--1"></span>
        <span class="design design--2"></span>
        <span class="design design--3"></span>
        <span class="design design--4"></span>
        <span class="design design--5"></span>
        <span class="design design--6"></span>
        <span class="design design--7"></span>
        <span class="design design--8"></span>
      </div>
    </div>

  </div>
</div>
      </>
    );
  }
}
