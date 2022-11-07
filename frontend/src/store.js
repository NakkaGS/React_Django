import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { cartReducer } from './reducers/cartReducers'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { userLoginReducer , userRegisterReducer, userDetailsReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
})

//get the data from the Local Storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [] //it checks if the attribute exist in the local storage

//get the data from the Local Storage
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null //it checks if the attribute exist in the local storage
    

const initialState = {
    cart: { cartItems: cartItemsFromStorage},
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))) //createStore is not been used anymore

export default store