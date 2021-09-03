import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import Cookies from "universal-cookie"

import breadCrumb from './reducers/UI/breadCrumb';
import productCategories from './reducers/productCategories';
import cart from './reducers/cart';
import userInfo from './reducers/userInfo'
import compare from './reducers/compare'
import favourites from './reducers/favourites'

import { assemblyFeatures } from './../components/ContstructorForm/modules';

const rootReducer = combineReducers(Object.assign({
   breadCrumb,
   productCategories,
   cart,
   assemblyFeatures,
   userInfo,
   compare,
   favourites
}));

// redux plugin to check requests to server and store
const composeEnhancers =
   typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

const enhancer = composeEnhancers(
   applyMiddleware(thunk)
);

let store;

const cookies = new Cookies();

   store = createStore(rootReducer, enhancer)


// const store = createStore(rootReducer, applyMiddleware(thunk)); //old version


export default store;