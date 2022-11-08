//it is used in store.js
//it must create first the action, 
//then the reducer, 
//write on the store, 
//check if worked using the brower (Redux)
//write the action
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

} from '../constants/productConstants' //it is like enum in C

//it works like state machine
//action.payload is the output from the action

//////////////////////////////////////////////
export const productListReducer = (state = {products:[]}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST: //it set the state loading to true and clear all the products
            return {loading:true, products: []}
        
        case PRODUCT_LIST_SUCCESS: //if the connection is OK, it gets all the product and reset the loading 
            return {loading: false, products: action.payload}

        case PRODUCT_LIST_FAIL: //is there is a error, it calls this case
            return {loading: false, error: action.payload}
        
        default:
            return state;
    }
}

//////////////////////////////////////////////
export const productDetailsReducer = (state = {products: {reviews:[]}}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state, product: []}
        
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}

        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        
        default:
            return state;
    }
}