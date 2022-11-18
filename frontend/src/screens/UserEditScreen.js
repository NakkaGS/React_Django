//App.js->Route->RegisterScreen.js

import React, { useState, useEffect } from "react";

//Router
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { getUserDetails, updateUser } from "../actions/userActions";

//Bootstrap Components
import { Form, Button } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

//Constants
import { USER_UPDATE_RESET } from '../constants/userConstants'

function EditUserScreen({ match }) {

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    //using the useParams (using the new version)
    //useParams returns the key of the  current <Route> (App.js - <Route path='product/:id'...> in this case id)
    let { id } = useParams(match); //get the Product ID  

    //Initial State Empty (initializing fields)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false) //by default it will be fault

    const dispatch = useDispatch();

    //it goes to store and call the reducer from 'userRegister'. In this reducer we get the following data (error, loading, userInfo)
    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate; //it change the variable name because of the duplicate names

    //it is to full fill the field as soon as we load the page
    useEffect(() => {

        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history('/admin/userlist')
        } else {
            
            if(!user?.name || user?._id !== Number(id)){
                dispatch(getUserDetails(id))
            } else {
                setName(user?.name)
                setEmail(user?.email)
                setIsAdmin(user?.isAdmin)
            }
        }


    }, [user, id, successUpdate, history, dispatch]);

    //Gambiarra to convert 'false' to 'False' because the GET just accept 'False
    let isAdminBool = 'False'

    if (isAdmin === false){
        isAdminBool = 'False'
    } else if (isAdmin === true){
        isAdminBool = 'True'
    }
    
    //console.log(isAdminBool)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ 
        '_id': user._id,
        'name': name,
        'email': email,
        'isAdmin': isAdminBool}))
    }

    return (
        <div>

            <Link to='/admin/userlist'>
                Go Back
            </Link>
            
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? 
                    <Loader/> 
                    : error 
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>

                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                    type="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                
                                <Form.Group className="mb-3" controlId="isAdmin">
                                    <Form.Check
                                    type="checkbox"
                                    label='Is Admin?'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    ></Form.Check>
                                </Form.Group>
                
                                <Button type="submit" variant="primary">
                                    Update
                                </Button>
            
                            </Form>
                        )
                }

            </FormContainer>
        </div>
    );
}

export default EditUserScreen;
