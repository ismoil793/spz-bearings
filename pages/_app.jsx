import App from 'next/app';
import { Provider } from 'react-redux';
import { useRouter, withRouter } from 'next/router'
import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../redux/store';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import NextSeo from 'next-seo';
import '../static/assets/css/globals.css'
// import * as gtag from '../lib/gtag'
// import ReactGA from 'react-ga'

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());



// let's create a configuration for next-seo
// const DEFAULT_SEO = {
//     title: 'Интернет-магазин компьютерной техники в Ташкенте | Kitmach Premium.UZ',
//     description: 'Купить ноутбуки, мониторы, видеокарты, комплектующие, wi-fi в Ташкенте по доступной цене и бесплатной доставкой? Легко на Kitmach Premium.uz!',
//     openGraph: {
//       type: 'website',
//       locale: 'ru_ru',
//       url: 'https://www.Kitmach Premium.uz',
//       title: 'Интернет-магазин компьютерной техники в Ташкенте | Kitmach Premium.UZ',
//       description: 'Купить ноутбуки, мониторы, видеокарты, комплектующие, wi-fi в Ташкенте по доступной цене и бесплатной доставкой? Легко на Kitmach Premium.uz!',
//       image:
//         '/static/assets/template/avtech/images/ogimage.png',
//       site_name: 'Kitmach Premium.uz',
//       imageWidth: 600,
//       imageHeight: 600
//     },
//     twitter: {
//       handle: '@garmeeh',
//       cardType: 'summary_large_image'
//     }
//   };


class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        
        //Anything returned here can be accessed by the client
        return {...pageProps};
    }
    // router = this.props.router
    
    // componentDidMount() {
    //     ReactGA.initialize('G-G6XDJS8DJQ')
    //     ReactGA.set({page: Router.pathname})
    //     ReactGA.pageview(Router.pathname)
    // }

    // componentDidUpdate(prevprops) {
    //         console.log('prevprops')
    //         if (this.props.router !== prevprops.router) {
    //         const handleRouteChange = (url) => {
    //             gtag.pageview(url)
    //         }
    //         this.props.router.events.on('routeChangeComplete', handleRouteChange);
    //         return () =>{
    //             this.props.router.events.off('routeChangeComplete', handleRouteChange)
    //         }
    //     }
    // }

    render() {
        console.log(this.props)
        
        //Page props that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps}/>
           </Provider>
        );
    }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
