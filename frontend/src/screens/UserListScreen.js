//App.js->Route->UserListScreen.js

import React, { useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listUsers, deleteUser } from "../actions/userActions";

//Bootstrap Components
import { Table, Button, Col, Row } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";
import MessageTimer from "../components/MessageTimer";

function UserListScreen() {

    const dispatch = useDispatch()

    let history = useNavigate() 

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')){
            //console.log('DELETE: ', id)
            dispatch(deleteUser(id))
        }
     }

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history('/login')//it is using useNavigate, it doesn't need push
        }
        
    }, [dispatch, history, userInfo, successDelete]);

    return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Users</h1>
            </Col>
            <Col>
                {successDelete && <MessageTimer variant='success'>User Deleted</MessageTimer>}
            </Col> 
        </Row>
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
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>

                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className="fas fa-check" style={{color: 'green'}}></i>
                                        ) : (
                                        <i className="fas fa-check" style={{color: 'red'}}></i>
                                        )}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sn'>
                                            <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen