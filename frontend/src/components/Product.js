//App.js->HomeScreen.js->Product.js
//It show the product with some describition (used in HomeScreen)

import React from 'react'

//Boostrap Components
import { Card, Row, Col, Badge } from 'react-bootstrap'

//Components
import Rating from './Rating'

import { Link } from 'react-router-dom'

function Product({ product }) { //take the product in HomeScreen
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} />
        </Link> 

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong> 
                {product.name}
              </strong>
            </Card.Title>
          </Link>
        </Card.Body>

        <Card.Text as='div'>
          <div className='my-3'>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
          </div>
        </Card.Text>

        <Card.Text as='div'>
          <Row>
            <Col>
              <h3>${product.price}</h3>
            </Col>

            <Col className="my-3">
              {product?.countInStock > 0 ? (<Badge bg="success">'In Stock'</Badge>) : (<Badge bg="danger">'Out of Stock'</Badge>)}
            </Col>
          </Row>       
        </Card.Text>

    </Card>
  )
}

export default Product