//App.js->Route->ProductScreen.js

import React, { useState, useEffect } from "react";

//Router
import { Link, useParams, useNavigate } from "react-router-dom"; //Library React Router Dom
import { LinkContainer } from "react-router-bootstrap";

//Redux
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { listProductDetails, createProductReview } from '../actions/productActions' //this is the reducer

//Bootstrap Components
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap"; //Library React Bootstrap

//Components
import Rating from "../components/Rating";
import Loader from '../components/Loader'
import Message from '../components/Message'

//Constants
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

//Axios
//import axios from 'axios' //not been used after the Redux application
//import products from "../products"; //used to read the products.js

//it was necessary to add '?' every time that we want to get a attribute from the product

function ProductScreen({ match }) {
  
  const [qty, setQty] = useState(1)

  //it is for the review
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  let history = useNavigate() //for V6 it is useNavigate, NOT useHistory

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  //const [product, setProduct] = useState([]) //not been used after the Redux application

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productCreateReview = useSelector(state => state.productCreateReview)
  const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productCreateReview

  //using the useParams (using the new version)
  //useParams returns the key of the  current <Route> (App.js - <Route path='product/:id'...> in this case id)
  let { id } = useParams(match); //get the Product ID
  //const product = products.find((p) => p._id === id); //find the related product using the id

  useEffect(() => {
    dispatch(listProductDetails(id))

    //It is part is same as in the action (productActions) - This part is used when we don't have Redux (it get the data from the Django)
/*     async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }

    fetchProduct() */

  }, [dispatch, id, match, history, successProductReview])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createProductReview(
          id, {
          rating,
          comment
      }
      ))
  }

  const addtoCardHandler = ( ) => {
    history(`/cart/${id}?qty=${qty}`) //it is using useNavigate, it doesn't need push
  }

  return(
    <div>
      <Link to="/" className="btn btn-light- my-3">Go Back</Link>

      {loading ?
        <Loader/>
        : error
          ? <Message variant='danger'>{error}</Message>
          : (
            <div>
              <Row>
                <Col md={6}>
                  <Image src={product?.image} alt={product?.name} fluid />
                  {/* //it was necessary to add '?' every time that we want to get a attribute from the product */}
                </Col>
      
                <Col md={3}>
                  <ListGroup variant="flush">

                    {userInfo && userInfo?.isAdmin && (
                      <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                        <Button variant='dark' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    )}

                    <ListGroup.Item>
                      <h3>{product?.name}</h3>
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      <Rating value={product?.rating} text={`${product?.numReviews} reviews`} color={'#f8e825'} />
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      Price: ${product?.price}
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      Description: {product?.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
        
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Price:
                          </Col>
        
                          <Col>
                            <strong>${product?.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
        
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            Status:
                          </Col>
                          
                          <Col>
                            {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product?.countInStock > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Qty:</Col>
                              <Col xs='auto' className='my-1'>

                              <Form.Control
                                  as='select'
                                  value={qty} //it must have the same name as in the database attribute
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {
                                    
                                    [...Array(product?.countInStock).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    ))
                                  }

                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )                 
                      }
                      <ListGroup.Item>
                        <Button 
                          onClick={addtoCardHandler}
                          className='btn-block' 
                          disabled={product?.countInStock === 0 || product?.countInStock < 0} 
                          type='button'>
                          Add to Cart
                        </Button>
                      </ListGroup.Item>

                    </ListGroup>
                  </Card>
                </Col>
              </Row>

              <Row className="my-3">
                <Col md={6}>
                  <h4>Reviews</h4>
                                    
                  {product?.reviews?.length === 0 && <Message variant='info'>No Reviews</Message>}

                  <ListGroup variant='flush'>
                      {product?.reviews?.map((review) => (
                          <ListGroup.Item key={review?._id}>
                              <strong>{review?.name}</strong>
                              <Rating value={review?.rating} color='#f8e825' />
                              <p>{review?.createdAt.substring(0, 10)}</p>
                              <p>{review?.comment}</p>
                          </ListGroup.Item>
                    ))}
                    
                    <ListGroup.Item className="my-3">
                        <h4>Write a review</h4>

                        {loadingProductReview && <Loader />}
                        {successProductReview && <Message variant='success'>Review Submitted</Message>}
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='comment'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='5'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button
                                    disabled={loadingProductReview}
                                    type='submit'
                                    variant='primary'
                                >
                                    Submit
                                </Button>

                            </Form>
                        ) : (
                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                            )}
                    </ListGroup.Item>

                  </ListGroup>
                </Col>
              </Row>
            </div>
          )
      }

    </div>
  )
};

export default ProductScreen;
