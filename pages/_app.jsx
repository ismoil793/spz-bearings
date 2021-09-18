import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import store from '../redux/store';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import '../static/assets/css/globals.css'
import '../static/assets/css/globally.scss'
// import * as gtag from '../lib/gtag'
// import ReactGA from 'react-ga'

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());




class MyApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        Router.events.on("routeChangeStart", () => {this.changeLoadingStatus(true); console.log('isLoading', this.state.isLoading)});
        Router.events.on('routeChangeComplete', () => {this.changeLoadingStatus(false); console.log('isLoading', this.state.isLoading)}); 
        Router.events.on('routeChangeError', () => {this.changeLoadingStatus(false); console.log('isLoading', this.state.isLoading)}); 
    }
    componentDidMount() {
        this.changeLoadingStatus(false)
    }

    changeLoadingStatus = (boolean) => {
        if (boolean) {
            this.setState({isLoading: boolean})
        }
        else setTimeout(() => {
            this.setState({isLoading: boolean})
        }, 300);
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
            <>
                <Component isLoading={this.state.isLoading} {...pageProps}/>  
            </>              
        );
    }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default MyApp;
