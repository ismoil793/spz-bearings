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
import '../static/assets/css/globally.scss'
// import * as gtag from '../lib/gtag'
// import ReactGA from 'react-ga'

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());



const Loader = (props) => {
    return (
        <div className="main_loader">
            <div class="preloader">
                <div class="preloader__square"></div>
                <div class="preloader__square"></div>
                <div class="preloader__square"></div>
                <div class="preloader__square"></div>
            </div>
        </div>
    )
}


class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        Router.events.on("routeChangeStart", () => {this.setState({isLoading: true}); console.log('routerstart')});
        Router.events.on('routeChangeComplete', () => {this.setState({isLoading: false}); console.log('routercompleted')}); 
    }
    componentWillMount() {
        console.log('app mount')
    }

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        
        //Anything returned here can be accessed by the client
        return {...pageProps};
    }



    render() {
        console.log('progress', NProgress)
        console.log(this.props)
        
        //Page props that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} = this.props;

        return (
            <Provider store={store}> 
            { this.state.isLoading ?
                <Loader/> : ''
            }
                <Component {...pageProps}/>
           </Provider>
        );
    }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
