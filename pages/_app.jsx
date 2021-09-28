import App from "next/app";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "../static/assets/css/globals.css";
import "../static/assets/css/globally.scss";
import YouTube from "react-youtube";
// import * as gtag from '../lib/gtag'
// import ReactGA from 'react-ga'
import video from '../static/assets/video/preload_spz.mp4'

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    Router.events.on("routeChangeStart", () => {
      this.changeLoadingStatus(true);
      console.log("isLoading", this.state.isLoading);
    });
    Router.events.on("routeChangeComplete", () => {
      this.changeLoadingStatus(false);
      console.log("isLoading", this.state.isLoading);
    });
    Router.events.on("routeChangeError", () => {
      this.changeLoadingStatus(false);
      console.log("isLoading", this.state.isLoading);
    });
  }
  componentDidMount() {
    this.changeLoadingStatus(false);
  }

  changeLoadingStatus = (boolean) => {
    if (boolean) {
      this.setState({ isLoading: boolean });
    } else
      setTimeout(() => {
        this.setState({ isLoading: boolean });
      }, 300);
  };

  componentWillMount() {
    console.log("app mount");
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be accessed by the client
    return { ...pageProps };
  }
  opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
       

  render() {
    //Page props that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    const { Component, pageProps, store } = this.props;

    return (
      <>
          {/* <YouTube
            className="youtube_player"
            videoId="mg0_R-eB3_w"
            opts={this.opts}
            onReady={this._onReady}
          /> */}
          <video autoplay="true" preload="auto" muted="muted">
            <source src={video} type="video/mp4"></source>
          </video>
        <Component locale={this.props.router.locale} isLoading={this.state.isLoading} {...pageProps}/>  
      </>
    );
  }
}

//withRedux wrapper that passes the store to the App Component
export default MyApp;
