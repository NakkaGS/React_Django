import axios from 'axios'

import { 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

//It works like a State Machine
//getState - lets get any part of the state (can get a single item)
export const addToCart = (id, qty) => async (dispatch, getState) => { //it is a action
     
    //I dont need the REQUEST and the FAIL
    //it call the https and get the data from the product and save in data
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
    
    //it will save the data into the local pc
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //it needs to be a string (stringify)
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //it needs to be a string (stringify)
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data)) //it needs to be a string (stringify)
}
