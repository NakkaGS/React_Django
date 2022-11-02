import axios from 'axios'

import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants' //it is like enum in C

//it works like a state machine
export const listProducts = (keyword = '') => async (dispatch) => { //it is a action
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
            const { data } = await axios.get(`/api/products${keyword}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail //if there a detail it show the detail, otherwise it shows the message set in 
                ? error.response.data.detail 
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => { //it is a action
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
            const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
