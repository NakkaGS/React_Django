import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        //Huge Problem with the orderItem was because it must be "Content-Type": "application/json", in orderActions
        const config = {
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo?.token}`,
            }
        }

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo }, //that is to get the token
        } = getState()

        //Huge Problem with the orderItem was because it must be "Content-Type": "application/json", in orderActions
        const config = {
            headers: { 
                'Content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}