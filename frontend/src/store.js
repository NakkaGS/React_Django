import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Reducers
import { cartReducer } from './reducers/cartReducers'

import {    productListReducer, 
            productDetailsReducer, 
            productDeleteReducer, 
            productCreateReducer, 
            productUpdateReducer,
            productReviewCreateReducer,
            productTopRatedReducer } from './reducers/productReducers'

import {    userLoginReducer, 
            userRegisterReducer, 
            userDetailsReducer, 
            userUpdateProfileReducer, 
            userListReducer, 
            userDeleteReducer,
            userUpdateReducer } from './reducers/userReducers'

import {    orderCreateReducer,
            orderDetailsReducer,
            orderPayReducer, 
            orderListMyReducer,
            orderListReducer,
            orderDeliverReducer } from './reducers/orderReducers'


//every time that one of the items on the left is call (in the screen, component), it calls the reducer 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productReviewCreateReducer,
    productTopRated : productTopRatedReducer,
    
    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer, //orders from the logged user
    orderList: orderListReducer, //orders from all users (just admin)
    orderDeliver: orderDeliverReducer,
    
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

})

//get the data from the Local Storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [] //it checks if the attribute exist in the local storage

//get the data from the Local Storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? //it checks if the attribute exist in the local storage, if not write blank
    JSON.parse(localStorage.getItem('userInfo')) : null

//get the data from the Local Storage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}
    
//Cart just have one reducer with all the States
//This part takes the value from Local Storage and put as initial values
const initialState = {
    cart: { cartItems: cartItemsFromStorage, 
            shippingAddress: shippingAddressFromStorage 
            },
    userLogin: { userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))) //createStore is not been used anymore

export default store