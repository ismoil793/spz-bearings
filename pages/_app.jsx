import App from "next/app";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../static/assets/css/globals.css";
import "../static/assets/css/globally.scss";
import video from '../static/assets/video/preload_spz.mp4'
import { wrapper } from "../store/store";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: true,
         videoPreloader: true
      };
      Router.events.on("routeChangeStart", () => {
         this.changeLoadingStatus(true);
      });
      Router.events.on("routeChangeComplete", () => {
         this.changeLoadingStatus(false);
      });
      Router.events.on("routeChangeError", () => {
         this.changeLoadingStatus(false);
      });
   }

   componentDidMount() {
      this.changeLoadingStatus(false);
   }

   changeLoadingStatus = (boolean) => {
      if (boolean) {
         this.setState({isLoading: boolean});
      } else
         setTimeout(() => {
            this.setState({isLoading: boolean});
         }, 300);
   };

   static async getInitialProps({Component, ctx}) {
      const pageProps = Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {};

      //Anything returned here can be accessed by the client
      return {...pageProps};
   }


   render() {
      //Page props that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
      const {Component, pageProps, store} = this.props;

      return (
          <>
             {this.state.videoPreloader ?
                 <Component locale={this.props.router.locale} isLoading={this.state.isLoading}
                            videoPreloader={this.state.videoPreloader} {...pageProps}/>
                 // <div className="video_player">
                 //    <video onPlay={() => setTimeout(() => this.setState({videoPreloader: false}), 2300)} autoplay="true"
                 //           preload="auto" muted="muted">
                 //       <source src={video} type="video/mp4"></source>
                 //    </video>
                 // </div>
                 :
                 <Component locale={this.props.router.locale} isLoading={this.state.isLoading}
                            videoPreloader={this.state.videoPreloader} {...pageProps}/>
             }
          </>
      );
   }
}

export default wrapper.withRedux(MyApp); /* connection of redux */
