//App.js->Route->PlaceOrderScreen.js

import React, { useEffect, useState } from "react";

//Router
import { Link, useParams } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { getOrderDetails, payOrder } from '../actions/orderActions'

//Bootstrap Components
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

//Components
import Message from "../components/Message";
import Loader from "../components/Message";

//Paypal Button
import { PayPalButton } from 'react-paypal-button-v2'

//Constant
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderScreen({ match }) {
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    //////////
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    //////////
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success:successPay } = orderPay

    //////////
    if(!loading && !error){
        order.itemsPrice = order?.orderItems.reduce((accu, item) => accu + item.price * item.qty, 0).toFixed(2)
    }

    //////////
    let { id } = useParams(match); //get the Product ID //it must be id (orderID doest work, i dont know why)
    
    /////////

    const addPayPalScript = () =>
    {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=Ae8QQlGXdr87ZA8LHzuTTo6dp_1FjuHLb6xgX7S5ct8NavJDKIjdrXbd39MSBowqSrXGj2oQ5cWFPPZL'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    ////////
    useEffect(() => {
        if (!order || successPay || order?._id !== Number(id)) {
            dispatch(getOrderDetails(id))
            //console.log('Getting Data')
            dispatch({type: ORDER_PAY_RESET})
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [order, id, dispatch, order?._id, successPay]) //effects is used when one of the parameters is updated
    
    ////////
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }


    //console.log(order)
    return loading ? (
        <Loader/>
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (

    <div>
        <Row>
            <h1>Order: </h1>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong> <a href={`malito: ${order.user.email}`}>{order.user.email}</a></p>

                        <p>
                            <strong>Shipping: </strong>
                            {order?.shippingAddress.address}, {order?.shippingAddress.city}
                            {' '}
                            {order?.shippingAddress.postalCode},
                            {' '}
                            {order?.shippingAddress.Country}
                        </p>

                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>

                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>

                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )
                    }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>

                        {order.orderItems.lenght === 0 ? 
                            <Message variant='info'>Your order is empty</Message> : ( 
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}

                                {!sdkReady ? (
                                    <Loader/>
                                ): (
                                    <PayPalButton 
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}

                                    />
                                )}
                            </ListGroup.Item>
                        )}

                    </ListGroup>
                </Card>                      
            </Col>
        </Row>
    </div>
    )
}

export default OrderScreen