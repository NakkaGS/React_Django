//App.js->Route->PlaceOrderScreen.js

import React, { useEffect } from "react";

//Router
import { Link, useParams } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { getOrderDetails } from '../actions/orderActions'

//Bootstrap Components
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

//Components
import Message from "../components/Message";
import Loader from "../components/Message";

function OrderScreen({ match }) {
    const dispatch = useDispatch()

    //////////
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    //////////
    if(!loading && !error){
        order.itemsPrice = order?.orderItems.reduce((accu, item) => accu + item.price * item.qty, 0).toFixed(2)
    }

    //////////
    let { id } = useParams(match); //get the Product ID //it must be id (orderID doest work, i dont know why)
    
    /////////
    useEffect(() => {

        if(!order || order?._id !== Number(id)) {
            dispatch(getOrderDetails(id))
        }
        

    }, [order, id, dispatch, order?._id]) //effects is used when one of the parameters is updated
    
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

                    </ListGroup>
                </Card>                      
            </Col>
        </Row>
    </div>
    )
}

export default OrderScreen