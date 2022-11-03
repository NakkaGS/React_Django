//it must create first the action, 
//then the reducer, 
//write on the store, 
//check if worked using the brower (Redux)
//write the action
import {    
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from '../constants/userConstants'

import { axios } from 'axios'

//It works like a State Machine
export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config ={
            headers: {
                'Content-type':'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login/'
            {'username': email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    }catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
} 