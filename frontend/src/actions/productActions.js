import axios from 'axios'

import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

} from '../constants/productConstants' //it is like enum in C

//it works like a state machine
//////////////////////////////////////////////
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

//////////////////////////////////////////////
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

//////////////////////////////////////////////
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.post(
            `/api/products/create/`,
            {}, //post needs to send something
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: { //It just worked like this for PUT. Axious is in x-www-form-urlencoded
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${userInfo?.token}`,
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product, //post needs to send something
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProductReview = (id, review) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: { 
                'Content-type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        //in the backend, there is a url (API) that it gets the data from the user
        const { data } = await axios.post(
            `/api/products/${id}/reviews/`,
            review, //post needs to send something
            config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}