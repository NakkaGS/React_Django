//App.js->Route->PaymentScreen.js

import React, { useState } from "react";

//Router
import { useNavigate } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { savePaymentMethod } from '../actions/cartActions'

//Bootstrap Components
import { Form, Button, Col } from "react-bootstrap";

//Components
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {

  //it goes to the store and call the reducer 'cart'
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  let history = useNavigate() 

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  if(!shippingAddress.shipping){
    history('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>

        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
            type='radio'
            label='PayPal or Credit Card'
            id='paypal'
            name='paymentMethod'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}>

            </Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default PaymentScreen