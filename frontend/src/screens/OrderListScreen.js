//App.js->Route->UserListScreen.js

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

    console.log(userInfo)

    useEffect(() => {
        dispatch(listOrders())
        console.log('Getting Data')
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
            console.log('Getting Data')
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
                                <th>Name</th>
                                <th>Total Price</th>
                                <th>Paid</th>
                                <th>Paid At</th>
                                <th>Delivered</th>
                                <th>Delivered At</th>
                                <th></th>
                            </tr>

                        </thead>

                        {console.log(orders)}

                        <tbody>
                            {orders.map(order => (
                                <tr key={order?._id}>
                                    <td>{order?._id}</td>
                                    <td>{order?.user.name}</td>
                                    <td>{order?.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        <i className="fas fa-check" style={{color: 'green'}}></i>
                                        ) : (
                                        <i className="fas fa-xmark" style={{color: 'red'}}></i>
                                        )}</td>

                                    <td>{order?.paidAt}</td>
                                    
                                    
                                    <td>{order?.isDelivered ? (
                                        <i className="fas fa-check" style={{color: 'green'}}></i>
                                        ) : (
                                        <i className="fas fa-xmark" style={{color: 'red'}}></i>
                                        )}</td>
                                    <td>{order?.deliveredAt}</td>

                                    <td>
                                        <LinkContainer to={`/admin/order/${order._id}/edit`}>
                                            <Button variant='light' className='btn-sn'>
                                            <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm'>
                                            <i className="fas fa-trash"></i>
                                        </Button>
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