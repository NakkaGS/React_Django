import React, { useState, useEffect } from "react";

import {  useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer
import { getUserDetails, register } from "../actions/userActions";

//Bootstrap Components
import { Form, Button, Row, Col } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
        history('/login');
    } else {
        if(!user || !user.name || userInfo._id !== user._id){ //that to get the data
          //console.log(`Before : ${userInfo?.email} and ${userInfo?.name}`)
            dispatch(getUserDetails('profile'))
            //console.log(`Getting data (user name): ${user?.email} and ${user?.name}`)
        }else{ //after get the data it full fill the data with setName and setEmail
            //console.log(`Trying to Fullfill field, ${user?.name} and ${user?.email}`)
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [history, dispatch, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name, email, password)); //it activate the function login
    }
  };
  return (
    <Row>
      <Col md={8}>
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

      <Col md={3}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
