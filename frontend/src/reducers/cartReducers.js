//it is used in store.js
//it must create first the action, 
//then the reducer, 
//write on the store, 
//check if worked using the brower (Redux)
//write the action

import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

} from '../constants/cartConstants' //it is like enum in C

//it works like state machine
//action.payload is the output from the action
export const cartReducer = (state = {cartItems:[], shippingAddress: {}}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload //it gets the infos set on the cartActions - payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        
        default:
            return state;
    }
}