//App.js->Route->OrderListScreen.js

import React, { useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listOrders } from "../actions/orderActions";

//Bootstrap Components
import { Table, Button } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderListScreen() {

    const dispatch = useDispatch()

    let history = useNavigate() 

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(listOrders())
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history('/login')//it is using useNavigate, it doesn't need push
        }
        
    }, [dispatch, history, userInfo]);

    return (
    <div>
        <h1>Orders</h1>
        {loading
            ? (<Loader />)
            : error 
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>Total</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>

                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order?._id}>
                                    <td>{order?._id}</td>
                                    <td>{order?.user.name}</td>
                                    <td>{order?.totalPrice}</td>
                                    
                                    <td>{order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                            <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                                        )}
                                    </td>

                                    <td>{order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)                                        
                                    ) : (
                                        <i className='fas fa-xmark' style={{ color: 'red' }}></i>
                                        )}
                                    </td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}/`}>
                                            <Button variant='dark' className='btn-sn'>
                                            Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                        
                )
        }
    </div>
    )
}

export default OrderListScreen