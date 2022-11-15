//App.js->Route->PlaceOrderScreen.js

import React, { useEffect } from "react";

//Router
import { Link, useNavigate } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { createOrder } from '../actions/orderActions'

//Bootstrap Components
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

//Components
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

function PlaceOrderScreen() {
    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    //////////
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    //////////
    const cart = useSelector(state => state.cart) 

    cart.itemsPrice = cart.cartItems.reduce((accu, item) => accu + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.ItemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    //////////
    if(!cart.paymentMethod){
        history('/payment')
    }

    //////////
    useEffect(() => {
        if (success) {
            history(`/order/${order?._id}`);
        }
    }, [success, history]) //effects is used when one of the parameters is updated

    //////////
    const dispatch = useDispatch()

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />

        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shippinh</h2>

                        <p>
                            <strong>Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.Country}

                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>

                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>

                        {cart.cartItems.lenght === 0 ? 
                            <Message variant='info'>Your cart us empty</Message> : ( 
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded /> 
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}

                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Button 
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}>
                                Place Order
                            </Button>
                        </ListGroup.Item>


                    </ListGroup>
                </Card>                      
            </Col>
        </Row>
    </div>
    )
}

export default PlaceOrderScreen