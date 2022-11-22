//App.js->Route->RegisterScreen.js

import React, { useState, useEffect } from "react";

//Router
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from "react-redux";
//useSelector - allows us to used certain parts of the state/reducer

//Actions
import { listProductDetails, updateProduct } from "../actions/productActions";

//Bootstrap Components
import { Form, Button } from "react-bootstrap";

//Components
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

//Constants
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen({ match }) {

    let history = useNavigate(); //for V6 it is useNavigate, NOT useHistory

    //using the useParams (using the new version)
    //useParams returns the key of the  current <Route> (App.js - <Route path='product/:id'...> in this case id)
    let { id } = useParams(match); //get the Product ID  

    //Initial State Empty (initializing fields)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch();

    //it goes to store and call the reducer from 'userRegister'. In this reducer we get the following data (error, loading, userInfo)
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    //it is to full fill the field as soon as we load the page
    useEffect(() => {
        
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history('/admin/productlist')
        } else {
            if(!product?.name || product?._id !== Number(id)){
                dispatch(listProductDetails(id))
            } else {
                setName(product?.name)
                setPrice(product?.price)
                setImage(product?.image)
                setBrand(product?.brand)
                setCategory(product?.category)
                setCountInStock(product?.countInStock)
                setDescription(product?.description)
            }
        }


    }, [dispatch, product?._id, successUpdate]);
    
    //console.log(isAdminBool)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    return (
        <div>

            <Link to='/admin/productlist'>
                Go Back
            </Link>
            
            <FormContainer>
                <h1>Edit Product</h1>

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
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                    type="number"
                                    placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                    type="text"
                                    label='Image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="countinstock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                    type="number"
                                    placeholder="Enter stock"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    ></Form.Control>
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

export default ProductEditScreen;
