//App.js->Route->LoginScreen.js

import React, { useState, useEffect } from 'react'

import { Link, useNavigate, useLocation } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from 'react-redux' 
//useSelector - allows us to used certain parts of the state/reducer
import { login } from '../actions/userActions'

//Bootstrap Components
import { Form, Button, Row, Col } from 'react-bootstrap'

//Components
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

function LoginScreen() {
    const [email, setEmail] = useState('') //it start the variable with what it written inside useState
    const [password, setPassword] = useState('') 

    let history = useNavigate() //for V6 it is useNavigate, NOT useHistory

    const dispatch = useDispatch()

    const location = useLocation()//this functions is equal to location.search
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
        dispatch(login(email, password)) //it activate the function login
    }

    return(
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Submit In
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Row>
        

        </FormContainer>
    )
}

export default LoginScreen