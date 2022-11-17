//App.js->Route->ProfileScreen.js

import React, { useState, useEffect } from "react";

//Router
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from '../actions/orderActions'

//Bootstrap Components
import { Form, Button, Row, Col, Table } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";

//Constants
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

  const dispatch = useDispatch();

  /////////

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading:loadingOrders, error:errorOrders, orders } = orderListMy

  /////////

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else {
      if(!user || !user.name || userInfo._id !== user._id)
      { //that to get the data
        dispatch({ type: USER_UPDATE_PROFILE_RESET}) //it helps to not get the same profile as in Edit User Profile
        dispatch(getUserDetails('profile')) //action getUserDetails = (id) //WHYYYY 'profile??????
        dispatch(listMyOrders())
        //console.log("Getting Data")
      }
      else
      { //after get the data it full fill the data with setName and setEmail
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, dispatch, user, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      //console.log('Updating')
      //action updateUserProfile = (user)
      dispatch(updateUserProfile({ 
        'id': user._id,
        'name': name,
        'email': email,
        'password': password
    })) 
      setMessage("");
    }
  };
  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>

      </Col>

      <Col md={8}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader/>

        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}</td>
                <td>
                    <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm'>Details</Button>
                    </LinkContainer>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        )
        }
      </Col>
    </Row>
  );
}

export default ProfileScreen;
