//App.js->Route->UserListScreen.js

import React, { useEffect } from "react";

//Router
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProducts } from '../actions/productActions'

//Bootstrap Components
import { Table, Button, Badge } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductListScreen() {

    const dispatch = useDispatch()

    let history = useNavigate() 

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList 
    //separate the data from the productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        console.log('Getting Data')
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            history('/login')//it is using useNavigate, it doesn't need push
        }
        
    }, [dispatch, history, userInfo]);

    return (
    <div>
        <h1>Products</h1>
        {loading
            ? (<Loader />)
            : error 
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>COUNT IN STOCK</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product?._id}>
                                    <td>{product?._id}</td>
                                    <td>{product?.name}</td>
                                    <td>{product?.price}</td>
                                    <td>{product?.countInStock} / {product?.countInStock > 0 ? (<Badge bg="success">'In Stock'</Badge>) : (<Badge bg="danger">'Out of Stock'</Badge>)}
                                    </td>
                                    <td>{product?.category}</td>
                                    <td>{product?.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' className='btn-sm'>
                                            <i className='fas fa-trash'></i>
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

export default ProductListScreen