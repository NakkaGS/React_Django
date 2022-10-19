import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams } from "react-router-dom"; //Library React Router Dom

import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap"; //Library React Bootstrap

import Rating from "../components/Rating";

import Loader from '../components/Loader' //to have the Spinner in the page
import Message from '../components/Message' //to have the Error in the page

//import products from "../products"; //used to read the products.js

import { listProductDetails } from '../actions/productActions'


//import axios from 'axios' //not been used after the Redux application


function ProductScreen() {
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {loading, error, product} = productDetails
  //const [product, setProduct] = useState([]) //not been used after the Redux application

  //using the useParams (using the new version)
  const { id } = useParams(); //get the Product ID
  //const product = products.find((p) => p._id === id); //find the related product using the id

  useEffect( () => {
    dispatch(listProductDetails(id))

    //It is part is same as in the action (productActions) - This part is used when we don't have Redux (it get the data from the Django)
/*     async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }

    fetchProduct() */

  }, [dispatch, id])

  return(
    <div>
      <Link to="/" className="btn btn-light- my-3">Go Back</Link>

      {loading ?
        <Loader/>
        : error
          ? <Message variant='danger'>{error}</Message>
          :(
            <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
    
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
    
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </ListGroup.Item>
    
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
    
                <ListGroup.Item>
                  Description: {product.description}
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
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
    
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:
                      </Col>
                      
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
    
                  <ListGroup.Item>
                    <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          )
      }

    </div>
  )
};

export default ProductScreen;
